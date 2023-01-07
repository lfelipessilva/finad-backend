import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ 
    origin: 'http://finad.devluis.tech',
    allowedHeaders: [
      'Access-Control-Allow-Headers', 'Content-Type',
      'Access-Control-Request-Headers',  'Content-Type'
    ],
  });
  await app.listen(8888);
}
bootstrap();
