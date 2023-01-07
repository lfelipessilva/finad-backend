import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.use(json())
  // app.use(urlencoded({ extended: true }))

  app.enableCors({ 
    origin: 'https://finad.devluis.tech',
  });

  await app.listen(process.env.PORT || 8888);
}
bootstrap();
