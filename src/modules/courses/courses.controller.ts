import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Put } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';
import { Lesson } from './entities/lesson.entity';
import { Roles } from '../users/decorators/user-role.decorator';
import { AuthGuard } from '../users/guards/auth.guard';
import { Role } from 'utils/enum';
import { CreateCourseDto } from './dtos/create-course.dto';
import { CreateLessonDto } from './dtos/create-lesson.dto';
import { LessonsService } from './lesseons.service';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import * as types from 'utils/types'
import { UpdateCourseDto } from './dtos/update-course.dto';
import { UpdateLessonDto } from './dtos/update-lesson.dto';

@Controller('api/courses')
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly lessonsService: LessonsService,
  ) {}

  // POST ~/api/courses/admin/create-course
  @Post('admin/create-course')
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  async createCourse(
    @CurrentUser() payload: types.JWTPayloadType,
    @Body() courseDto: CreateCourseDto, 
  ): Promise<Course> {
    return this.coursesService.createCourse(courseDto, payload.id);
  }

  // POST ~/api/courses/admin/add-lesson
  // POST ~/api/courses/instructor/add-lesson
  @Post('admin/add-lesson')
  @Post('instructor/add-lesson')
  @UseGuards(AuthGuard)
  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  async addLessonToCourse(
    @CurrentUser() payload: types.JWTPayloadType,
    @Body() lessonDto: CreateLessonDto, ) {
    return this.coursesService.addLessonToCourse(lessonDto, payload.id);
  }

  // GET ~/api/courses  
  @Get()
  async getAllCourses(): Promise<Course[]> {
    return this.coursesService.getAllCourses();
  }

  // GET ~/api/courses/:courseId
  @Get(':courseId')
  async getCourse(
    @Param('courseId') courseId: number
  ): Promise<Course> {
    return this.coursesService.getCourseById(courseId);
  }

  // GET ~/api/courses/:courseId/lessons/:lessonId
  @Get(':courseId/lessons/:lessonId')
  async getLessonInCourse(
    @Param('courseId') courseId: number,
    @Param('lessonId') lessonId: number,
  ): Promise<Lesson[]> {
    return this.coursesService.getSinglelessoninCourse(courseId, lessonId);
  }

  // GET ~/api/courses/:courseId/lessons
  @Get(':courseId/lessons')
  async getLessonsInCourse(
    @Param('courseId') courseId: number
  ): Promise<Lesson[]> {
    return this.lessonsService.getLessonsByCourseId(courseId);
  }

  // PUT ~/api/courses/admin/update-course
  @Put('admin/update-course')
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  async updateCourse(
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<Course> {
    return this.coursesService.updateCourse(updateCourseDto)
  }

  // PUT ~/api/courses/admin/update-lesson
  @Put('admin/update-lesson')
  @Put('instructor/update-lesson')
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN, Role.INSTRUCTOR)
  async updateLesson(
    @Body() updateLessonDto: UpdateLessonDto,
  ): Promise<Lesson> {
    return this.lessonsService.updateLesson(updateLessonDto)
  }

  @Delete('admin/delete-course/:courseId')
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  async deleteCourse(
    @Param('courseId') courseId: number,
  ) {
    return this.coursesService.deleteCourse(courseId);
  }
  
  // DELETE ~/api/courses/admin/delete-lesson/:lessonId
  @Delete('admin/delete-lesson/:lessonId')
  @Delete('instructor/delete-lesson/:lessonId')
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN, Role.INSTRUCTOR)
  async deleteLesson(
    @Param('lessonId') lessonId: number,
  ) {
    return this.lessonsService.deleteLesson(lessonId);
  }
}
