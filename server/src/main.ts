import * as session from 'express-session';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'somebs',
      resave: false,
      saveUninitialized: false,
    }),
    cookieParser(),
  );

  await app.listen(4000);
}
bootstrap();
