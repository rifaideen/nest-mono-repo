import { AuthUser } from '@app/auth-library/auth-user.decorator';
import { JwtAuthGuard } from '@app/auth-library/guards/jwt-auth.guard';
import { ForgotPasswordDTO } from '@app/auth-library/dto/forgot-password.dto';
import { ResetPasswordDTO } from '@app/auth-library/dto/reset-password.dto';
import { LoginDTO } from '@app/auth-library/dto/login.dto';
import { Body, Controller, Get, HttpCode, HttpException, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AuthUserType } from './types/auth-user.type';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private authClient: ClientProxy) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: LoginDTO): Promise<any> {
    try {
      const response = await firstValueFrom(this.authClient.send('auth.login', dto));
      response.status = 'success';

      return response;
    } catch (error) {
      throw new HttpException({
        statusCode: 400,
        message: [error.message || error],
        error: 'Bad Request',
      }, 400);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@AuthUser() user: AuthUserType): Promise<any> {
    return user;
  }

  @Post('forgot-password')
  @HttpCode(200)
  async forgotPassword(@Body() dto: ForgotPasswordDTO): Promise<any> {
    try {
      return await firstValueFrom(this.authClient.send('auth.forgot-password', dto));
    } catch (error) {
      throw new HttpException({
        statusCode: 400,
        message: [error.message || error],
        error: 'Bad Request',
      }, 400);
    }
  }

  @Post('reset-password')
  @HttpCode(200)
  async resetPassword(@Body() dto: ResetPasswordDTO): Promise<any> {
    try {
      return await firstValueFrom(this.authClient.send('auth.reset-password', dto));
    } catch (error) {
      throw new HttpException({
        statusCode: 400,
        message: [error.message || error],
        error: 'Bad Request',
      }, 400);
    }
  }
}
