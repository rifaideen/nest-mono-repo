import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthLibraryModule } from '@app/auth-library';

@Module({
  imports: [
    AuthLibraryModule,
  ],
  providers: [],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
