import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { User } from '../users/entities/user.entity';


@Injectable()
export class EmailService {
  constructor(
    private readonly mailService: MailerService,
  ) { }

  /**
   * Send new assignment email to user
   * @param user user to send email to
   */
  public async sendNewAssignmentEmail(user: User) {
    try {
      await this.mailService.sendMail({
        to: user.email,
        from: `<no-reply@my-nest-app.com>`,
        subject: `New Assignment`,
        template: `
        <h1>New Assignment</h1>
        <p>You have a new assignment Check your course for more details</p>
        <p>Thank you</p>
        `,
      })
    } catch (err) {
      console.log(err)
    }
  }

  public async sendNewLessonEmail(user: User) {
    try {
      await this.mailService.sendMail({
        to: user.email,
        from: `<no-reply@my-nest-app.com>`,
        subject: `New Lesson`,
        template: `
        <h1>New Lesson</h1>
        <p>You have a new lesson Check your course for more details</p>
        <p>Thank you</p>
        `,
      })
    } catch (err) {
      console.log(err)
    }
  }
}