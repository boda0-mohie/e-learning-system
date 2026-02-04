import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { Lesson } from './entities/lesson.entity';
import { CreateCourseDto } from './dtos/create-course.dto';
import { Role } from 'utils/enum';
import { CreateLessonDto } from './dtos/create-lesson.dto';
import { LessonsService } from './lesseons.service';
import { UpdateCourseDto } from './dtos/update-course.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
    private usersService: UsersService,
    private lessonsService: LessonsService,
  ) { }

  /**
   * Create a new course
   * @param courseDto data to create new course
   * @param adminId create this course
   * @returns new course
   */
  public async createCourse(courseDto: CreateCourseDto, adminId: number): Promise<Course> {
    const user = await this.usersService.getUserById(courseDto.instructorId);
    if (user.role !== Role.INSTRUCTOR) {
      throw new BadRequestException('User is not an instructor');
    }
    const newCourse = this.coursesRepository.create({
      title: courseDto.title,
      description: courseDto.description,
      academicYear: courseDto.academicYear,
      major: courseDto.major,
      term: courseDto.term,
      instructorId: courseDto.instructorId,
      adminId: adminId,
    });
    return this.coursesRepository.save(newCourse);
  }

  /**
   * Add lesson to course
   * @param lessonDto data to create new lesson
   * @param creatorId create this lesson
   * @returns new lesson
   */
  public async addLessonToCourse(lessonDto: CreateLessonDto, creatorId: number) {
    return this.lessonsService.addLesson(lessonDto, creatorId);
  }

  /**
   * Get all courses
   * @returns all courses
   */
  public async getAllCourses(): Promise<Course[]> {
    return this.coursesRepository.find({ relations: ['lessons', 'assignments'] });
  }

  /**
   * Get course by id
   * @param courseId id of the course
   * @returns course
   */
  public async getCourseById(courseId: number): Promise<Course> {
    const course = await this.coursesRepository.findOne({
      where: { id: courseId },
      relations: ['lessons', 'assignments'],
    });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course;
  }

  public async getSinglelessoninCourse(courseId: number, lessonId: number): Promise<Lesson[]> {
    return this.lessonsService.getlessoninCourse(courseId, lessonId);
  }

  /**
   * Update course information
   * @param updateCourseDto data to update course
   * @returns updated course
   */
  public async updateCourse(updateCourseDto: UpdateCourseDto): Promise<Course> {
    const { courseId, ...updateData } = updateCourseDto;
    const course = await this.getCourseById(courseId);
    Object.assign(course, updateData);
    return this.coursesRepository.save(course);
  }

  /**
   * Delete a course
   * @param courseId id of course 
   * @returns message 
   */
  public async deleteCourse(courseId: number) {
    const course = await this.getCourseById(courseId);
    await this.coursesRepository.remove(course);
    return {
      message: 'Course deleted successfully',
    }
  }
}
