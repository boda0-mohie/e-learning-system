import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { Lesson } from './entities/lesson.entity';
import { User } from '../users/entities/user.entity';
import { Role } from 'utils/enum';
import { CreateLessonDto } from './dtos/create-lesson.dto';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
    @InjectRepository(Lesson)
    private lessonsRepository: Repository<Lesson>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  /**
   * Add a lesson to a course
   * @param lessonDto data to create lesseon
   * @returns new lesson added to course
   */
  public async addLesson(lessonDto: CreateLessonDto) {
    const { courseId, title, content, videoUrl, duration, creatorId } = lessonDto;
    const creator = await this.usersRepository.findOneBy({ id: creatorId });

    if (!creator || creator.role !== Role.INSTRUCTOR) {
      throw new Error('Creator not found or not an instructor');
    }

    const course = await this.coursesRepository.findOneBy({ id: courseId });
    if (!course) {
      throw new Error('Course not found');
    }

    const lessonsCount = await this.lessonsRepository.count({
      where: {
        course: { id: courseId },
      },
    });

    const lesson = this.lessonsRepository.create({
      title,
      content,
      videoUrl,
      duration,
      creatorId,
      lessonOrder: lessonsCount + 1,
      course: course,
    });
    
    await this.lessonsRepository.save(lesson);
    await this.coursesRepository.save(course);
    return {
      message: 'Lesson added successfully',
      course,
      lesson,
    }
  }

  /**
   * Get lessons by course id
   * @param courseId id of the course
   * @returns lessons of this course
   */
  public async getLessonsByCourseId(courseId: number): Promise<Lesson[]> {
    return this.lessonsRepository.find({
      where: { course: { id: courseId } },
      order: { lessonOrder: 'ASC' },
    })
  }
}
