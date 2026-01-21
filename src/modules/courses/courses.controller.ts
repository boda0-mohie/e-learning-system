import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';
import { Lesson } from './entities/lesson.entity';
import { Roles } from '../users/decorators/user-role.decorator';
import { AuthGuard } from '../users/guards/auth.guard';
import { Role } from 'utils/enum';
import { CreateCourseDto } from './dtos/create-course.dto';
import { CreateLessonDto } from './dtos/create-lesson.dto';
import { LessonsService } from './lesseons.service';

@Controller('api/courses')
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly lessonsService: LessonsService,
  ) {}
  
  // POST ~/api/courses/admin/:adminId
  @Post('admin/:adminId')
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  async createCourse(@Body() courseDto: CreateCourseDto, @Param('adminId') adminId: number): Promise<Course> {
    return this.coursesService.createCourse(courseDto, adminId);
  }

  // POST ~/api/courses/lessons
  @Post('lessons')
  @UseGuards(AuthGuard)
  @Roles(Role.INSTRUCTOR)
  async addLessonToCourse(@Body() lessonDto: CreateLessonDto) {
    return this.coursesService.addLessonToCourse(lessonDto);
  }

  // GET ~/api/courses
  @Get()
  async getAllCourses(): Promise<Course[]> {
    return this.coursesService.getAllCourses();
  }

  // GET ~/api/courses/:courseId
  @Get(':courseId')
  async getCourse(@Param('courseId') courseId: number): Promise<Course> {
    return this.coursesService.getCourseById(courseId);
  }

  // GET ~/api/courses/:courseId/lessons
  @Get(':courseId/lessons')
  async getLessonsInCourse(@Param('courseId') courseId: number): Promise<Lesson[]> {
    return this.lessonsService.getLessonsByCourseId(courseId);
  }
}
