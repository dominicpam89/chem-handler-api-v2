import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PubchemService } from './pubchem.service';
import { PubchemController } from './pubchem.controller';
import { PubchemApiMiddleware } from './middlewares/pubchem-api.middleware';

@Module({
  providers: [PubchemService],
  controllers: [PubchemController],
})
export class PubchemModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PubchemApiMiddleware).forRoutes('/pubchem');
  }
}
