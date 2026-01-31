import { InjectRepository } from "@nestjs/typeorm";
import { Enrollment } from "./entities/enrollment.entity";
import { Repository } from "typeorm";
import { BadRequestException, forwardRef, Inject, NotFoundException } from "@nestjs/common";
import { CoursesService } from "../courses/courses.service";
import { StudentProfileService } from "../profiles/studentProfile/studentProfile.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentRepository: Repository<Enrollment>,
    @Inject(forwardRef(() => CoursesService))
    private readonly coursesService: CoursesService,
    @Inject(forwardRef(() => StudentProfileService))
    private readonly studentProfileService: StudentProfileService,
  ) { }

  public async enrollStudent(courseId: number, profilId: number): Promise<Enrollment> {
    const course = await this.coursesService.getCourseById(courseId);
    const studentProfile = await this.studentProfileService.getStudentProfile(profilId);
    if (course.academicYear !== studentProfile.academicYear) {
      throw new BadRequestException('Student profile academic year does not match course academic year');
    }
    if (course.major !== studentProfile.major) {
      throw new BadRequestException('Student profile major does not match course major');
    }
    if (course.term !== studentProfile.term) {
      throw new BadRequestException('Student profile term does not match course term');
    }
    const CheckEnrollment = await this.enrollmentRepository.findOne({
      where: {
        course: { id: course.id },
        profile: { id: studentProfile.id },
      },
    });
    if (CheckEnrollment) {
      throw new BadRequestException('Student is already enrolled in this course');
    }
    const enrollment = this.enrollmentRepository.create({
      course,
      profile: studentProfile,
    });
    return this.enrollmentRepository.save(enrollment);
  }
}