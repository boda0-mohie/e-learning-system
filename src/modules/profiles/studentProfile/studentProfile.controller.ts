import { Body, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { StudentProfileService } from './studentProfile.service';
import { CreateStudentProfileDto } from './dtos/create-studentProfile.dto';
import { StudentProfile } from './entities/studentPofile.entity';
import { CurrentUser } from 'src/modules/users/decorators/current-user.decorator';
import { AuthGuard } from 'src/modules/users/guards/auth.guard';
import { Role } from 'utils/enum';
import { Roles } from 'src/modules/users/decorators/user-role.decorator';
import { Controller } from '@nestjs/common';
import * as types from 'utils/types';
import { ApiSecurity } from '@nestjs/swagger';
import { UpdateStudentProfileDto } from './dtos/update-studenProfile.dto';

@Controller('api/student-profile')
export class StudentProfileController {
  constructor(private readonly studentProfileService: StudentProfileService) {}

  // POST /api/student-profile/create-profile
  @Post('create-profile')
  @Roles(Role.STUDENT)
  @UseGuards(AuthGuard)
  @ApiSecurity('bearer')
  public async createStudentProfile(
    @Body() createStudentProfileDto: CreateStudentProfileDto,
    @CurrentUser() payload: types.JWTPayloadType,
  ): Promise<StudentProfile> {
    return this.studentProfileService.createStudentProfile(
      payload.id,
      createStudentProfileDto,
    );
  }

  // GET /api/student-profile
  @Get()
  @Roles(Role.STUDENT)
  @UseGuards(AuthGuard)
  @ApiSecurity('bearer')
  public async getStudentProfile(
    @CurrentUser() payload: types.JWTPayloadType,
  ): Promise<StudentProfile> {
    return this.studentProfileService.getStudentProfile(payload.id);
  }

  // PUT /api/student-profile
  @Put()
  @Roles(Role.STUDENT)
  @UseGuards(AuthGuard)
  @ApiSecurity('bearer')
  public async updateStudentProfile(
    @Body() updateStudentProfileDto: UpdateStudentProfileDto,
    @CurrentUser() payload: types.JWTPayloadType,
  ): Promise<StudentProfile> {
    return this.studentProfileService.updateStudentProfile(
      payload.id,
      updateStudentProfileDto,
    );
  }

  // DELETE /api/student-profile
  @Delete()
  @Roles(Role.STUDENT)
  @UseGuards(AuthGuard)
  @ApiSecurity('bearer')
  public async deleteStudentProfile(
    @CurrentUser() payload: types.JWTPayloadType,
  ): Promise<StudentProfile> {
    return this.studentProfileService.deleteStudentProfile(payload.id);
  }
}
