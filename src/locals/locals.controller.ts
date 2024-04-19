import { Controller, Get, Param } from '@nestjs/common';
import { LocalsService } from './locals.service';

@Controller('compounds')
export class LocalsController {
  constructor(private localsService: LocalsService) {}
  @Get()
  getCompounds() {
    return this.localsService.getCompounds();
  }
  @Get('/:id')
  getCompound(@Param('id') id: string) {
    return this.localsService.getCompound(id);
  }
}
