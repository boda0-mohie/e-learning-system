import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Lesson } from './entities/lesson.entity';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { LessonsService } from './lesseons.service';
import { UsersModule } from '../users/users.module';
import { EnrollmentModule } from '../enrollments/enrollments.module';
import { Assignment } from './entities/assignment.entity';
import { AssignmentsService } from './assignmets.service';
import { forwardRef } from '@nestjs/common';
import { StudentProfileModule } from '../profiles/studentProfile/studentProfile.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    UsersModule,
    forwardRef(() => EnrollmentModule),
    forwardRef(() => StudentProfileModule),
    forwardRef(() => MailModule),
    TypeOrmModule.forFeature([Course, Lesson, Assignment]),
  ],
  providers: [CoursesService, LessonsService, AssignmentsService],
  controllers: [CoursesController],
  exports: [CoursesService, TypeOrmModule],
})
export class CoursesModule { }
