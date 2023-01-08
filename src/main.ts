import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'https://finad.devluis.tech',
    allowedHeaders: ['Content-Type'],
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  });

  app.use(cookieParser());
  await app.listen(process.env.PORT || 8888);
}
bootstrap();
