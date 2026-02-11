import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { AcademicYear, Major, Term } from "utils/enum";
import { ApiProperty } from "@nestjs/swagger";


export class UpdateCourseDto {
    @IsNotEmpty()
    @IsNumber()
    courseId: number;

    @IsString()
    @IsOptional()
    @ApiProperty({ description: 'Course title' })
    title: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ description: 'Course description' })
    description: string;

    @IsOptional()
    @IsEnum(AcademicYear)
    @ApiProperty({ description: 'Academic year' })
    academicYear: AcademicYear;

    @IsOptional()
    @IsEnum(Major)
    @ApiProperty({ description: 'Major' })
    major: Major;

    @IsOptional()
    @IsEnum(Term)
    @ApiProperty({ description: 'Term' })
    term: Term;

    @IsOptional()
    @ApiProperty({ description: 'Instructor id' })
    instructorId: number;
}