import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { AcademicYear, Major, Term } from "utils/enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Course title' })
    title: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ description: 'Course description' })
    description: string;
    
    @IsNotEmpty()
    @IsEnum(AcademicYear)
    @ApiProperty({ description: 'Academic year' })
    academicYear: AcademicYear;

    @IsNotEmpty()
    @IsEnum(Major)
    @ApiProperty({ description: 'Major' })
    major: Major;

    @IsNotEmpty()
    @IsEnum(Term)
    @ApiProperty({ description: 'Term' })
    term: Term;

    @IsNotEmpty()
    @ApiProperty({ description: 'Instructor id' })
    instructorId: number;
}