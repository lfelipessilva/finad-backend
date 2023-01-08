import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.use(
  //   json({
  //     type: ['application/json', 'text/plain'],
  //   }),
  // );

  app.use(json())
  app.use(urlencoded({ extended: true }));

  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*' )
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Origin, Accept');
    res.setHeader('Access-Control-Request-Method', 'POST');
    res.setHeader('Access-Control-Request-Headers', 'content-type');	
    return next();
  });

  // app.enableCors({
  //   // allowedHeaders: ['content-type'],
  //   origin: 'https://finad.devluis.tech',
  // });

  await app.listen(process.env.PORT || 8888);
}
bootstrap();
