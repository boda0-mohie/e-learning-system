import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { Lesson } from './entities/lesson.entity';
import { User } from '../users/entities/user.entity';
import { Role } from 'utils/enum';
import { CreateLessonDto } from './dtos/create-lesson.dto';
import { UpdateLessonDto } from './dtos/update-lesson.dto';

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
  public async addLesson(lessonDto: CreateLessonDto, creatorId: number) {
    const { courseId, title, content, videoUrl, duration } = lessonDto;
    const creator = await this.usersRepository.findOneBy({ id: creatorId });

    if (!creator || (creator.role !== Role.INSTRUCTOR && creator.role !== Role.ADMIN)) {
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

  /**
   * Get lesson in course by lesson id and course id
   * @param courseId id of course
   * @param lessonId id of lesson
   * @returns lesson in course
   */
  public async getlessoninCourse(courseId: number, lessonId: number): Promise<Lesson[]> {
    const course = await this.coursesRepository.findOneBy({ id: courseId });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    const lesson = await this.lessonsRepository.find({
      where: { course: { id: courseId, }, id: lessonId },
    });
    if (!lesson || lesson.length === 0) {
      throw new NotFoundException('Lesson not found in this course');
    }
    return lesson;
  }

  /**
   * Update lesson by lesson id
   * @param updateLessonDto data to update lesson
   * @returns updated lesson
   */
  public async updateLesson(updateLessonDto: UpdateLessonDto) {
    const { lessonId, title, content, videoUrl, duration } = updateLessonDto;
    const lesson = await this.lessonsRepository.findOneBy({ id: lessonId });
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }
    lesson.title = title ?? lesson.title;
    lesson.content = content ?? lesson.content;
    lesson.videoUrl = videoUrl ?? lesson.videoUrl;
    lesson.duration = duration ?? lesson.duration;
    await this.lessonsRepository.save(lesson);
    return lesson;
  }

  /**
   * Delete lesson by lesson id
   * @param lessonId id of lesson
   * @returns deleted lesson
   */
  public async deleteLesson(lessonId: number) {
    const lesson = await this.lessonsRepository.findOneBy({ id: lessonId });
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }
    await this.lessonsRepository.remove(lesson);
    return lesson;
  }
}
