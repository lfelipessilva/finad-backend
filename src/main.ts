import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: 'https://finad.devluis.tech',
  });

  // app.use(
  //   json({
  //     type: ['application/json', 'text/plain'],
  //   }),
  // );

  app.use(json())
  app.use(urlencoded({ extended: true }));


  await app.listen(process.env.PORT || 8888);
}
bootstrap();
