import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ 
    origin: 'https://finad.devluis.tech',
    allowedHeaders: [
      'Access-Control-Allow-Origin', 'https://finad.devluis.tech',
      'Access-Control-Allow-Haders', 'Content-Type',
      'Access-Control-Request-Headers',  'Content-Type'
    ],
    methods: ['GET',  'POST', 'PUT', 'DELETE'],
  });
  await app.listen(8888);
}
bootstrap();
