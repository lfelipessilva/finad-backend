import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ 
    origin: 'https://finad.devluis.tech',
    allowedHeaders: [
      'Content-Type', 'Origin', 'Access-Control-Allow-Origin'
    ],
    credentials: true,
  });

  await app.listen(process.env.PORT || 8888);
}
bootstrap();
