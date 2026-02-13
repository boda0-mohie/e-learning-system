import { Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";
import { EmailService } from "./mail.service";

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          transport: {
            host: config.get<string>('STMP_HOST'),
            port: config.get<number>('STMP_PORT'),
            secure: false,
            auth: {
              user: config.get<string>('STMP_USERNAME'),
              pass: config.get<string>('STMP_PASSWORD')
            }
          },
        }
      }
    })
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class MailModule { }