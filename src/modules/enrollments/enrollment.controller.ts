import { Controller, Param, Post, UseGuards } from "@nestjs/common";
import { EnrollmentService } from "./enrollments.service";
import { Enrollment } from "./entities/enrollment.entity";
import { CurrentUser } from "../users/decorators/current-user.decorator";
import * as types from "utils/types";
import { AuthGuard } from "../users/guards/auth.guard";
import { Roles } from "../users/decorators/user-role.decorator";
import { Role } from "utils/enum";


@Controller('api/enrollments')
export class EnrollmentController {
    constructor(
        private readonly enrollmentService: EnrollmentService,
    ) {}

    @Post('/:courseId')
    @UseGuards(AuthGuard)
    @Roles(Role.STUDENT)
    public async enrollStudent(
        @CurrentUser() payload:types.JWTPayloadType,
        @Param('courseId') courseId: number,
    ): Promise<Enrollment> {
        return this.enrollmentService.enrollStudent(courseId, payload.id);
    }
}