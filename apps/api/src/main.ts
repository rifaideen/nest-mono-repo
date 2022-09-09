import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  app.setGlobalPrefix('api');
  const config = app.get(ConfigService);
  const port = config.get<number>('api_server_port');
  await app.listen(port);
  console.log(`🚀 API server ready at http://localhost:${port}`);
}
bootstrap();
