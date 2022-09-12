import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthLibraryModule } from '@app/auth-library';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    AuthLibraryModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: 'EMAIL_SERVICE',
      useFactory(configService: ConfigService) {
        const url = configService.get<string>('rabbitmq.url');
        const queue = configService.get<string>('rabbitmq.emailQueue');

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [url],
            queue,
            queueOptions: {
              durable: false
            },
          },
        });
      },
      inject: [ConfigService],
    }
  ],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
