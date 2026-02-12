import { InjectRepository } from '@nestjs/typeorm';
import { StudentProfile } from './entities/studentPofile.entity';
import { Repository } from 'typeorm';
import { CreateStudentProfileDto } from './dtos/create-studentProfile.dto';
import { Role } from 'utils/enum';
import { User } from 'src/modules/users/entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateStudentProfileDto } from './dtos/update-studenProfile.dto';

@Injectable()
export class StudentProfileService {
  constructor(
    @InjectRepository(StudentProfile)
    private readonly studentProfileRepository: Repository<StudentProfile>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Create a new student profile
   * @param userId
   * @param createStudentProfileDto
   * @returns new student profile
   */
  public async createStudentProfile(
    userId: number,
    createStudentProfileDto: CreateStudentProfileDto,
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
    const profile = await this.studentProfileRepository.findOne({
      where: { id: user.id },
      relations: {
        user: true,
        enrollments: {
          course: {
            lessons: true,
            assignments: true,
          },
        },
      },
    });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return profile;
  }

  /**
   * Update a student profile
   * @param userId user id
   * @param updateStudentProfileDto
   * @returns updated student profile
   */
  public async updateStudentProfile(
    userId: number,
    updateStudentProfileDto: UpdateStudentProfileDto,
  ): Promise<StudentProfile> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user || user.role !== Role.STUDENT) {
      throw new Error('User not found');
    }
    const profile = await this.studentProfileRepository.findOneBy({ id: user.id });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    profile.major = updateStudentProfileDto.major ?? profile.major;
    profile.academicYear = updateStudentProfileDto.academicYear ?? profile.academicYear;
    profile.term = updateStudentProfileDto.term ?? profile.term;
    profile.gpa = updateStudentProfileDto.gpa ?? profile.gpa;
    return this.studentProfileRepository.save(profile);
  }

  /**
   * Delete a student profile
   * @param userId user id
   * @returns deleted student profile
   */
  public async deleteStudentProfile(userId: number): Promise<StudentProfile> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user || user.role !== Role.STUDENT) {
      throw new Error('User not found');
    }
    const profile = await this.studentProfileRepository.findOneBy({ id: user.id });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return this.studentProfileRepository.remove(profile);
  }
}
