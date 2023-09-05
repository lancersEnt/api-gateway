import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);

  app.enableCors({
    credentials: true,
    origin: 'http://192.168.1.199:5173',
  });
  app.use(cookieParser());

  await app.listen(3000);
}

bootstrap();
