import { NestFactory } from '@nestjs/core';
import {
  NestExpressApplication,
  ExpressAdapter,
} from '@nestjs/platform-express';
import { GatewayModule } from './gateway.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app: NestExpressApplication =
    await NestFactory.create<NestExpressApplication>(
      GatewayModule,
      new ExpressAdapter(),
    );

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  app.use(cookieParser());

  await app.listen(3001);
}

bootstrap();
