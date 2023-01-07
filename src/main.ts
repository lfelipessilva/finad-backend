import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ 
    origin: 'https://finad.devluis.tech',
    allowedHeaders: ['Content-Type', 'application/json'],
    methods: ['GET',  'POST', 'PUT', 'DELETE'],
  });
  await app.listen(8888);
}
bootstrap();
