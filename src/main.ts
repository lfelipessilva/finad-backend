import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    json({
      type: ['application/json', 'text/plain'],
    }),
  );
  app.use(urlencoded({ extended: true }));

  // app.use(functio_n (req, res, next) {
  //   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  //   return next();
  // });

  app.enableCors({
    allowedHeaders: ['Content-Type'],
    origin: 'https://finad.devluis.tech',
  });

  await app.listen(process.env.PORT || 8888);
}
bootstrap();
