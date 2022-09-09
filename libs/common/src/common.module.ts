import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { AuthModule } from './auth/auth.module';

@Module({
  providers: [CommonService],
  exports: [CommonService],
  imports: [AuthModule],
})
export class CommonModule {}
