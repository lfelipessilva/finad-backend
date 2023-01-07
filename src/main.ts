import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(json({
    type: ['application/json', 'text/plain']
  }))
  app.use(urlencoded({ extended: true }))

  app.enableCors({ 
    origin: 'https://finad.devluis.tech',
    allowedHeaders: ['Access-Control-Request-Headers', 'Content-Type']
  });

  await app.listen(process.env.PORT || 8888);
}
bootstrap();
