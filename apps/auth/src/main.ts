import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: parseInt(process.env.AUTH_SERVER_PORT),
    }
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
  console.log('🚀 Auth microservice server started successfully.');
}
bootstrap();
