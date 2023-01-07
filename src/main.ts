import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: { 
    origin: 'https://finad.devluis.tech',
    allowedHeaders: [
      'Content-Type',
    ],
    credentials: true,
  } });

  await app.listen(process.env.PORT || 8888);
}
bootstrap();
