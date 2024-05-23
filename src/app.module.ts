import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PubchemModule } from './pubchem/pubchem.module';
import { LocalsModule } from './locals/locals.module';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PubchemModule,
    LocalsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_PIPE, useValue: new ValidationPipe({ whitelist: true }) },
  ],
})
export class AppModule {}
