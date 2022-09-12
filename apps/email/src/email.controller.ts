import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EmailService } from './email.service';

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @EventPattern('forgot-password')
  async forgotPassword(@Payload() data: any) {
    const url = 'http://localhost:3000/reset-password'
    const payload = {
      from: 'Rifaudeen <rifa_sender@yopmail.com>',
      to: 'rifa_receiver@yopmail.com',
      subject: 'Reset Password',
      template: 'forgot-password',
      data: {
        name: data.username,
        link: `${url}?token=${data.token}`
      }
    }
    await this.emailService.sendEmail(payload);
  }
}
