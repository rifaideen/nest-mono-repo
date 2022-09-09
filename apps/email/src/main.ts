import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { EmailModule } from './email.module';

async function bootstrap() {
  const app = await NestFactory.create(EmailModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = app.get(ConfigService);
  const port = config.get<number>('email_server_port');
  await app.listen(port);
  console.log(`🚀 Email server ready at http://localhost:${port}`);
}
bootstrap();
