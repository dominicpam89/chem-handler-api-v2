import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CompoundsService } from '../compounds.service';
import { plainToClass } from 'class-transformer';
import { CreateCompoundDto } from '../dtos/create-compound.dto';
import { validate } from 'class-validator';

@Injectable()
export class CreateCompoundInterceptor implements NestInterceptor {
  constructor(private compoundService: CompoundsService) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const body = request.body;
    const lastId = (await this.compoundService.getCompounds()).length;
    const transformedCompound = {
      ...body,
      pk: lastId + 1,
    };
    const dto = plainToClass(CreateCompoundDto, transformedCompound);
    const errors = await validate(dto);
    if (errors.length)
      throw new BadRequestException(
        'Input is not the same with Compound class',
      );
    request.transformedCompound = dto;
    return next.handle();
  }
}
