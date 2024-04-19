import { Module } from '@nestjs/common';
import { LocalsService } from './locals.service';
import { LocalsController } from './locals.controller';

@Module({
  providers: [LocalsService],
  controllers: [LocalsController],
})
export class LocalsModule {}
