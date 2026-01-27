import { Body, Get, Post, UseGuards } from "@nestjs/common";
import { StudentProfileService } from "./studentProfile.service";
import { CreateStudentProfileDto } from "./dtos/create-studentProfile.dto";
import { User } from "src/modules/users/entities/user.entity";
import { StudentProfile } from "./entities/studentPofile.entity";
import { CurrentUser } from "src/modules/users/decorators/current-user.decorator";
import { AuthGuard } from "src/modules/users/guards/auth.guard";
import { Role } from "utils/enum";
import { Roles } from "src/modules/users/decorators/user-role.decorator";
import { Controller } from "@nestjs/common";
import * as types from 'utils/types'

@Controller('api/student-profile')
export class StudentProfileController {
    constructor(
        private readonly studentProfileService: StudentProfileService,
    ) { }

    // POST /api/student-profile/create-profile
    @Post('create-profile')
    @Roles(Role.STUDENT)
    @UseGuards(AuthGuard)
    public async createStudentProfile(
        @Body() createStudentProfileDto: CreateStudentProfileDto,
        @CurrentUser() payload: types.JWTPayloadType,
    ): Promise<StudentProfile> {
        return this.studentProfileService.createStudentProfile(payload.id, createStudentProfileDto);
    }

    // GET /api/student-profile
    @Get()
    @Roles(Role.STUDENT)
    @UseGuards(AuthGuard)
    public async getStudentProfile(
        @CurrentUser() payload: types.JWTPayloadType,
    ): Promise<StudentProfile> {
        return this.studentProfileService.getStudentProfile(payload.id);
    }
}