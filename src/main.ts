import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: 'https://finad.devluis.tech', methods: ['GET',  'POST'], preflightContinue: true });
  await app.listen(8888);
}
bootstrap();
