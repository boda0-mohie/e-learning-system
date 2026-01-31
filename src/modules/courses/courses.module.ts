import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Lesson } from './entities/lesson.entity';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { LessonsService } from './lesseons.service';
import { UsersModule } from '../users/users.module';
import { EnrollmentModule } from '../enrollments/enrollments.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Course, Lesson]),
    EnrollmentModule,
  ],
  providers: [CoursesService, LessonsService],
  controllers: [CoursesController],
  exports: [CoursesService, TypeOrmModule],
})
export class CoursesModule {}
