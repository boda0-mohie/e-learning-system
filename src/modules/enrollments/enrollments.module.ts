import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Enrollment } from "./entities/enrollment.entity";
import { EnrollmentService } from "./enrollments.service";
import { EnrollmentController } from "./enrollment.controller";
import { CoursesModule } from "../courses/courses.module";
import { StudentProfileModule } from "../profiles/studentProfile/studentProfile.module";
import { JwtModule } from "@nestjs/jwt";


@Module({
  imports: [
    TypeOrmModule.forFeature([Enrollment]),
    forwardRef(() => CoursesModule),
    forwardRef(() => StudentProfileModule),
    JwtModule
  ],
  providers: [EnrollmentService],
  controllers: [EnrollmentController],
  exports: [TypeOrmModule, EnrollmentService],
})
export class EnrollmentModule { }