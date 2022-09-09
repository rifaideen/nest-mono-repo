import { JwtAuthGuard } from '@app/common/auth/guards/jwt-auth.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('ping')
  @UseGuards(JwtAuthGuard)
  getHello(): string {
    return this.apiService.getHello();
  }
}
