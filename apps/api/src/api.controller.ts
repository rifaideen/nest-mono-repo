import { AuthUser } from '@app/auth-library/auth-user.decorator';
import { AuthUserType } from '@app/auth-library/auth-user.type';
import { JwtAuthGuard } from '@app/auth-library/guards/jwt-auth.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';

@Controller()
export class ApiController {
  @Get('')
  @UseGuards(JwtAuthGuard)
  getHello(@AuthUser() user: AuthUserType): string {
    return `Hello ${user.firstName} ${user.lastName}.`;
  }
}
