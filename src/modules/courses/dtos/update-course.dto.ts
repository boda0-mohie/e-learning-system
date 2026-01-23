import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { AcademicYear, Major, Term } from "utils/enum";


export class UpdateCourseDto {
    @IsNotEmpty()
    @IsNumber()
    courseId: number;

    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsOptional()
    @IsEnum(AcademicYear)
    academicYear: AcademicYear;

    @IsOptional()
    @IsEnum(Major)
    major: Major;

    @IsOptional()
    @IsEnum(Term)
    term: Term;

    @IsOptional()
    instructorId: number;
}