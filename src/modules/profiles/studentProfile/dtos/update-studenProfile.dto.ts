import { IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateStudentProfileDto {
    @IsString()
    @IsOptional()
    @ApiProperty({ description: 'Student name' })
    name?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ description: 'Student photo' })
    photo?: string;

}