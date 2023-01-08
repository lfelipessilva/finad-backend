import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'https://finad.devluis.tech',
    allowedHeaders: ['Content-Type'],
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS']
  });

  await app.listen(process.env.PORT || 8888);
}
bootstrap();
