import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const origins = ['http://localhost:5173', 'https://zenbit-ten.vercel.app'];

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: origins },
  });
  await app.listen(3000);
}
bootstrap();
