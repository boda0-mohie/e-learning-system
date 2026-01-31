import { IsNumber, IsNotEmpty } from "class-validator";

export class EnrollmentDto {
    @IsNumber()
    @IsNotEmpty()
    profileId: number;
    @IsNumber()
    @IsNotEmpty()
    courseId: number;
}