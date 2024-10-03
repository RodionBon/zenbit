import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const origins = ['http://localhost:5173'];

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: origins },
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
 