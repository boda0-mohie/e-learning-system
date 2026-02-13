import { InjectRepository } from '@nestjs/typeorm';
import { StudentProfile } from './entities/studentPofile.entity';
import { Repository } from 'typeorm';
import { CreateStudentProfileDto } from './dtos/create-studentProfile.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateStudentProfileDto } from './dtos/update-studenProfile.dto';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class StudentProfileService {
  constructor(
    @InjectRepository(StudentProfile)
    private readonly studentProfileRepository: Repository<StudentProfile>,
    private readonly userService: UsersService,
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
    const user = await this.userService.getUserById(userId);
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
    const user = await this.userService.getUserById(userId);
    const profile = await this.studentProfileRepository.findOne({
      where: { id: user.id },
      relations: {
        enrollments: {
          course: true,
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
    const user = await this.userService.getUserById(userId);
    const profile = await this.getStudentProfile(user.id);
    const { major, academicYear, term, gpa } = updateStudentProfileDto;
    profile.major = major ?? profile.major;
    profile.academicYear = academicYear ?? profile.academicYear;
    profile.term = term ?? profile.term;
    profile.gpa = gpa ?? profile.gpa;
    return this.studentProfileRepository.save(profile);
  }

  /**
   * Delete a student profile
   * @param userId user id
   * @returns deleted student profile
   */
  public async deleteStudentProfile(userId: number): Promise<StudentProfile> {
    const user = await this.userService.getUserById(userId);
    const profile = await this.getStudentProfile(user.id);
    return this.studentProfileRepository.remove(profile);
  }
}
