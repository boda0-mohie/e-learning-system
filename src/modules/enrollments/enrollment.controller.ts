import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { EnrollmentService } from './enrollments.service';
import { Enrollment } from './entities/enrollment.entity';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import * as types from 'utils/types';
import { AuthGuard } from '../users/guards/auth.guard';
import { Roles } from '../users/decorators/user-role.decorator';
import { Role } from 'utils/enum';
import { ApiSecurity } from '@nestjs/swagger';

@Controller('api/enrollments')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post('/:courseId')
  @UseGuards(AuthGuard)
  @Roles(Role.STUDENT)
  @ApiSecurity('bearer')
  public async enrollStudent(
    @CurrentUser() payload: types.JWTPayloadType,
    @Param('courseId') courseId: number,
  ): Promise<Enrollment> {
    return this.enrollmentService.enrollStudent(courseId, payload.id);
  }

  @Get('/')
  @UseGuards(AuthGuard)
  @Roles(Role.STUDENT)
  @ApiSecurity('bearer')
  public async getMyEnrollments(
    @CurrentUser() payload: types.JWTPayloadType,
  ) {
    return this.enrollmentService.getMyEnrollments(payload.id);
  }

  @Get('/:courseId/students')
  @UseGuards(AuthGuard)
  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  @ApiSecurity('bearer')
  public async getStudentsByCourseId(
    @Param('courseId') courseId: number,
  ) {
    return this.enrollmentService.getStudentsByCourseId(courseId);
  }
}
