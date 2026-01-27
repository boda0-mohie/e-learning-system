import { InjectRepository } from "@nestjs/typeorm";
import { StudentProfile } from "./entities/studentPofile.entity";
import { Repository } from "typeorm";
import { CreateStudentProfileDto } from "./dtos/create-studentProfile.dto";
import { Role } from "utils/enum";
import { User } from "src/modules/users/entities/user.entity";
import { NotFoundException } from "@nestjs/common";


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
    public async getStudentProfile(userId: number): Promise<StudentProfile> {
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user || user.role !== Role.STUDENT) {
            throw new NotFoundException('User not found');
        }
        const profile = await this.studentProfileRepository.findOneBy({ id: user.id });
        if (!profile) {
            throw new NotFoundException('Profile not found');
        }
        return {
            ...profile,
            user,
        };
    }
}