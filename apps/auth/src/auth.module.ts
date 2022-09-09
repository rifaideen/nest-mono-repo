import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthLibraryModule } from '@app/auth-library';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

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
    }
  ],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
