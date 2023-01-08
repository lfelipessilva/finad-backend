import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://finad.devluis.tech');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });

  app.enableCors();

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
