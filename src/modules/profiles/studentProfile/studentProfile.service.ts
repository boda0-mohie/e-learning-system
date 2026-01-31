import { InjectRepository } from "@nestjs/typeorm";
import { StudentProfile } from "./entities/studentPofile.entity";
import { Repository } from "typeorm";
import { CreateStudentProfileDto } from "./dtos/create-studentProfile.dto";
import { Role } from "utils/enum";
import { User } from "src/modules/users/entities/user.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Course } from "src/modules/courses/entities/course.entity";
import { Enrollment } from "src/modules/enrollments/entities/enrollment.entity";
import { CoursesService } from "src/modules/courses/courses.service";
import { EnrollmentService } from "src/modules/enrollments/enrollments.service";

@Injectable()
export class StudentProfileService {
    constructor(
        @InjectRepository(StudentProfile)
        private readonly studentProfileRepository: Repository<StudentProfile>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }


    /**
     * Create a new student profile
     * @param userId 
     * @param createStudentProfileDto 
     * @returns new student profile
     */
    public async createStudentProfile(
        userId: number,
        createStudentProfileDto: CreateStudentProfileDto
    ): Promise<StudentProfile> {
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user || user.role !== Role.STUDENT) {
            throw new Error('User not found');
        }
        const studentProfile = this.studentProfileRepository.create({
            ...createStudentProfileDto,
            user,
        });
        return this.studentProfileRepository.save(studentProfile);
    }


    /**
     * Get a student profile by user id
     * @param userId user id
     * @returns student profile
     */
    public async getStudentProfile(userId: number) {
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user || user.role !== Role.STUDENT) {
            throw new NotFoundException('User not found');
        }
        const profile = await this.studentProfileRepository.findOne({
            where: { id: user.id },
            relations: ['enrollments'],
        });
        if (!profile) {
            throw new NotFoundException('Profile not found');
        }
        // const enrollments = await this.getEnrollments(profile.id);
        // console.log(enrollments);
        return {
            ...profile,
            // enrollments,
        };
    }

    
}