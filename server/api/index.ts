import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const origins = ['https://zenbit-ten.vercel.app'];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: origins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
