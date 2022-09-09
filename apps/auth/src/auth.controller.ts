import { AuthLibraryService } from '@app/auth-library';
import { AuthUser } from '@app/auth-library/auth-user.decorator';
import { AuthUserType } from '@app/auth-library/auth-user.type';
import { JwtAuthGuard } from '@app/auth-library/guards/jwt-auth.guard';
import { LocalAuthGuard } from '@app/auth-library/guards/local-auth.guard';
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthLibraryService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<{ access_token: string }> {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@AuthUser() user: AuthUserType): Promise<any> {
    return user;
  }
}
