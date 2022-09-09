import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const config = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  const port = config.get<number>('auth_server_port');
  await app.listen(port);
  console.log(`🚀 Auth server ready at http://localhost:${port}`);
}
bootstrap();
