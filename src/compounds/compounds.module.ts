import { Module } from '@nestjs/common';
import { CompoundsService } from './compounds.service';
import { CompoundsController } from './compounds.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compound } from './compounds.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Compound])],
  providers: [CompoundsService],
  controllers: [CompoundsController],
})
export class CompoundsModule {}
