import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MessageInterface } from './interface/message.interface';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  /**
   * Send email from template
   * @param message
   */
  async sendEmail(message: MessageInterface): Promise<boolean> {
    try {
      await this.mailerService.sendMail({
        to: message.to,
        from: message.from,
        subject: message.subject,
        template: message.template,
        context: message.data || {}
      });

      return true;
    } catch (error) {
      console.log('Send email error:', error);
      throw error; 
    }
  }
}
