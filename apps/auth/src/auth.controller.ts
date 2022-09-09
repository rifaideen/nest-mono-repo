import { AuthLibraryService } from '@app/auth-library';
import { AuthUser } from '@app/auth-library/auth-user.decorator';
import { AuthUserType } from '@app/auth-library/auth-user.type';
import { JwtAuthGuard } from '@app/auth-library/guards/jwt-auth.guard';
import { LocalAuthGuard } from '@app/auth-library/guards/local-auth.guard';
import { BadRequestException, Body, Controller, Get, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { ForgotPasswordDTO } from './dto/forgot-password.dto';
import { ResetPasswordDTO } from './dto/reset-password.dto';

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

  @Post('forgot-password')
  @HttpCode(200)
  async forgotPassword(@Body() dto: ForgotPasswordDTO): Promise<any> {
    const user = await this.authService.createResetPasswordToken(dto.email);

    if (!user) {
      throw new BadRequestException('The email address you entered does not exist.');
    }

    // @todo send reset password email

    return {
      status: 'success',
      message: 'Your reset password link has been sent to your email address.'
    }
  }

  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDTO): Promise<any> {
    if (dto.newPassword !== dto.confirmPassword) {
      throw new BadRequestException(['The passwords do not match.']);
    }

    const user = await this.authService.resetPassword(dto.token, dto.newPassword);

    return { user };
  }
}
