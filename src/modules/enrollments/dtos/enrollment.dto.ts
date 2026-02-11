import { IsNumber, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class EnrollmentDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ description: 'Profile id' })
    profileId: number;
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ description: 'Course id' })
    courseId: number;
}