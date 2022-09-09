import { Controller, Get } from '@nestjs/common';
// import { EmailService } from './email.service';

@Controller()
export class EmailController {
  // constructor(private readonly emailService: EmailService) {}

  // @Get('test-email')
  // async test() {
  //   const payload = {
  //     from: 'Rifaudeen <rifa_sender@yopmail.com>',
  //     to: 'rifa_receiver@yopmail.com',
  //     subject: 'Order Received',
  //     template: 'test',
  //     data: {
  //       name: "HelloApp",
  //       products: [
  //         {
  //           product_name: "Foo",
  //           quantity: 1,
  //           price: 10
  //         },
  //         {
  //           product_name: "Foo 2",
  //           quantity: 1,
  //           price: 10
  //         }
  //       ]
  //     }
  //   };
  //   await this.emailService.sendEmail(payload);

  //   return 'done?';
  // }
}
