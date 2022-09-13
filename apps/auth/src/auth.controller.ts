import { AuthLibraryService } from '@app/auth-library';
import { ForgotPasswordDTO } from '@app/auth-library/dto/forgot-password.dto';
import { ResetPasswordDTO } from '@app/auth-library/dto/reset-password.dto';
import { Controller, Inject, UseFilters } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { ExceptionFilter } from './exception-filter/rpc-exception.filter';

@UseFilters(new ExceptionFilter)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthLibraryService, @Inject('EMAIL_SERVICE') private emailService: ClientProxy) { }
  
  @MessagePattern('auth.login')
  async login(
    @Payload('username') username: string, 
    @Payload('password') password: string
  ): Promise<any> {
    const user = await this.authService.validateUser(username, password);

    if (user) {
      return this.authService.login(user);
    }

    throw new RpcException('Invalid credentials.');
  }

  @MessagePattern('auth.forgot-password')
  async forgotPassword(@Payload() dto: ForgotPasswordDTO): Promise<any> {
    const user = await this.authService.createResetPasswordToken(dto.email);

    if (!user) {
      throw new RpcException('The email address you entered does not exist.');
    }

    this.emailService.emit('forgot-password', {
      username: `${user.firstName} ${user.lastName}`,
      email: dto.email,
      token: user.passwordResetToken
    });

    return {
      status: 'success',
      message: 'Your reset password link has been sent to your email address.'
    }
  }

  @MessagePattern('auth.reset-password')
  async resetPassword(@Payload() dto: ResetPasswordDTO): Promise<any> {
    if (dto.newPassword !== dto.confirmPassword) {
      throw new RpcException(['The passwords do not match.']);
    }

    const user = await this.authService.resetPassword(dto.token, dto.newPassword);

    if (!user) {
      throw new RpcException('The reset password token is invalid.');
    }

    return {
      status: 'success',
      message: 'Password reset successfully.'
    }
  }
}
