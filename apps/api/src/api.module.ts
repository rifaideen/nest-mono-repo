import { AuthLibraryModule } from '@app/auth-library';
import configuration from '@app/common/config/configuration';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import apiConfiguration from './config/api.configuration';
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
    AuthLibraryModule,
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
