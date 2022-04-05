import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TwitterStrategy } from './twitter.strategy';
import { ConfigModule } from '@nestjs/config';
import { TscpModule } from './tscp/tscp.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client/public'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TscpModule,
  ],
  controllers: [AppController],
  providers: [AppService, TwitterStrategy],
})
export class AppModule {}
