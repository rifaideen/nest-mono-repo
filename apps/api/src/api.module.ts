import { AuthLibraryModule } from '@app/auth-library';
import configuration from '@app/common/config/configuration';
import { RabbitmqModule } from '@app/common/rabbitmq/rabbitmq.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import apiConfiguration from './config/configuration';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitMqService } from './services/rabbitmq.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      // registering globally
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      load: [configuration, apiConfiguration],
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('database.connectionString'),
      }),
      inject: [ConfigService],
    }),
    AuthLibraryModule,
    RabbitmqModule,
  ],
  controllers: [ApiController],
  providers: [ApiService, RabbitMqService],
})
export class ApiModule {}
