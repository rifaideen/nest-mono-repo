import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.AUTH_SERVER_HOST || '127.0.0.1',
          port: parseInt(process.env.AUTH_SERVER_TCP_PORT),
        },
      },
    ]),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
