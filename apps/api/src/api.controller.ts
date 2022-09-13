import { AuthUser } from '@app/auth-library/auth-user.decorator';
import { AuthUserType } from '@app/auth-library/auth-user.type';
import { JwtAuthGuard } from '@app/auth-library/guards/jwt-auth.guard';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller()
export class ApiController {
  constructor(private apiService: ApiService) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
  getHello(@AuthUser() user: AuthUserType): string {
    return `Hello ${user.firstName} ${user.lastName}.`;
  }

  /**
   * Example: Western Union money transfer service
   */
  @Post('transfer')
  @UseGuards(JwtAuthGuard)
  async transfer(
    @AuthUser() user: AuthUserType,
    @Body('amount') amount: number,
    @Body('currency') currency: string,
    @Body('account') account: string,
    @Body('country') country: string
  ) {

    const transferred = await this.apiService.transfer(amount, currency, country);
    const status = transferred ? 'success' : 'failed';

    return {
      status,
      message: `Dear ${user.firstName} ${user.lastName}, Transfer of amount ${amount} ${currency} to ${account}, ${country.toUpperCase()} is ${status}.`,
    }
  }
}
