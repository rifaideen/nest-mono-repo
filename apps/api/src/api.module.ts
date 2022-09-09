
import { AuthModule } from '@app/common/auth/auth.module';
import configuration from '@app/common/config/configuration';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import apiConfiguration from '../config/api.configuration';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      // registering globally
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      load: [configuration, apiConfiguration],
    }),
    AuthModule
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
