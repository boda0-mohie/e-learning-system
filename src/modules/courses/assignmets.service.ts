import { BadRequestException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Assignment } from "./entities/assignment.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateAssignmentDto } from "./dtos/create-assignment.dto";
import { UsersService } from "../users/users.service";
import { Role } from "utils/enum";
import { CoursesService } from "./courses.service";

@Injectable()
export class AssignmentsService {
    constructor(
        @InjectRepository(Assignment)
        private readonly assignmentsRepository: Repository<Assignment>,
        private readonly usersService: UsersService,
        private readonly coursesService: CoursesService,
    ) { }

    /**
   * Add assignment to course
   * @param assignmentDto data to create new assignment
   * @param creatorId create this assignment
   * @returns new assignment
   */
    public async addAssignmentToCourse(assignmentDto: CreateAssignmentDto, creatorId: number) {
        const course = await this.coursesService.getCourseById(assignmentDto.courseId);
        const creator = await this.usersService.getUserById(creatorId);
        // console.log(course.instructorId, creatorId, creator.role);
        if (course.instructorId !== creatorId && creator.role !== Role.ADMIN) {
            throw new BadRequestException('User is not authorized to create assignment');
        }
        const newAssignment = this.assignmentsRepository.create({
            title: assignmentDto.title,
            description: assignmentDto.description,
            deadline: assignmentDto.deadline,
            course_id: assignmentDto.courseId,
            creator_id: creatorId,
        });
        return this.assignmentsRepository.save(newAssignment);
    }
}