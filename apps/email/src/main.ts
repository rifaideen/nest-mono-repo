import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { EmailModule } from './email.module';

async function bootstrap() {
  const RMQ_URL = process.env.RMQ_URL;
  const RMQ_EMAIL_QUEUE = process.env.RMQ_EMAIL_QUEUE;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    EmailModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [RMQ_URL],
        queue: RMQ_EMAIL_QUEUE,
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
  console.log(`🚀 Email microservice created successfully`);
}
bootstrap();
