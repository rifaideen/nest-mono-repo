import configuration from '@app/common/config/configuration';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import emailConfiguration from './config/email-configuration';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      // registering globally
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      load: [configuration, emailConfiguration],
    }),
    MailerModule.forRootAsync({
        useFactory(configService: ConfigService) {
          return {
            transport: configService.get('email.transport'),
            defaults: configService.get('email.defaults'),
            template: {
              dir: __dirname + '/templates',
              adapter: new HandlebarsAdapter(),
              options: {
                strict: true,
              }
            },
          }
        },
        inject: [ConfigService],
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
