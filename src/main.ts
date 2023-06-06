import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true,
    origin: process.env.FRONT_END_URL,
    allowedHeaders: ['Content-Type'],
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  });

  const options = new DocumentBuilder()
    .setTitle('Finad!')
    .setDescription('The Finad! API Documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    ignoreGlobalPrefix: true,
  });

  SwaggerModule.setup('docs', app, document);

  app.use(cookieParser());
  await app.listen(process.env.PORT || 8888);
}
bootstrap();
