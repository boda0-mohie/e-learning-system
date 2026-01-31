import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import * as studentProfileEntity from './entities/studentPofile.entity';
import { StudentProfileService } from './studentProfile.service';
import { StudentProfileController } from './studentProfile.controller';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/modules/users/users.module';
import { AuthGuard } from 'src/modules/users/guards/auth.guard';
import { EnrollmentModule } from '../../enrollments/enrollments.module';

@Module({
  imports: [
    UsersModule,
    forwardRef(() => EnrollmentModule),
    TypeOrmModule.forFeature([studentProfileEntity.StudentProfile]),
    JwtModule
  ],
  providers: [AuthGuard, StudentProfileService],
  controllers: [StudentProfileController],
  exports: [StudentProfileService, TypeOrmModule],
})
export class StudentProfileModule {}