import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CompoundsService } from './compounds.service';
import { CreateCompoundDto } from './dtos/create-compound.dto';
import { CreateCompoundInterceptor } from './interceptors/create-compound.interceptor';
import { UseCreateCompound } from './decorators/create-compound.decorator';
import { UpdateCompoundDto } from './dtos/update-compound.dto';

@Controller('compounds')
export class CompoundsController {
  constructor(private compoundService: CompoundsService) {}

  @Get()
  getCompounds() {
    return this.compoundService.getCompounds();
  }

  @Get('/search')
  getCompoundSearch(@Query('trivialname') trivialName: string) {
    return this.compoundService.getCompoundSearch(trivialName);
  }

  @Get('/:pk')
  async getCompound(@Param('pk') pk: string) {
    if (!Number(pk))
      throw new NotFoundException(
        "Couldn't reach page you're looking for, try put compound's id",
      );
    const compound = await this.compoundService.getCompound(pk);
    if (!compound)
      throw new NotFoundException("Couldn't get compound based on given pk!");
    return compound;
  }

  @UseInterceptors(CreateCompoundInterceptor)
  @Post()
  createCompound(@UseCreateCompound() compound: CreateCompoundDto) {
    return this.compoundService.createCompound(compound);
  }

  @Delete('/:pk')
  deleteCompound(@Param('pk') pk: string) {
    return this.compoundService.deleteCompound(pk);
  }

  @Patch('/:pk')
  updateCompound(@Param('pk') pk: string, @Body() body: UpdateCompoundDto) {
    return this.compoundService.updateCompound(pk, body);
  }
}
