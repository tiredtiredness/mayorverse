import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api'); // localhost:4200/api
  app.use(cookieParser());
  app.enableCors({
    origin: ['http://localhost:3000', 'http://172.20.10.13:3000'],
    credentials: true,
    exposedHeaders: 'set-cookie',
  });

  // await app.listen(4200, '172.20.10.13');
  await app.listen(4200);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
