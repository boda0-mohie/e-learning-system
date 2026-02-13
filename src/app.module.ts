import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/database.config';
import { UsersModule } from './modules/users/users.module';
import { CoursesModule } from './modules/courses/courses.module';
import { StudentProfileModule } from './modules/profiles/studentProfile/studentProfile.module';
import { EnrollmentModule } from './modules/enrollments/enrollments.module';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [
    UsersModule,
    CoursesModule,
    StudentProfileModule,
    EnrollmentModule,
    MailModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
  ],
})
export class AppModule { }
