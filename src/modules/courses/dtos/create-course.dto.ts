import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { AcademicYear, Major, Term } from "utils/enum";


export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description: string;
    
    @IsNotEmpty()
    @IsEnum(AcademicYear)
    academicYear: AcademicYear;

    @IsNotEmpty()
    @IsEnum(Major)
    major: Major;

    @IsNotEmpty()
    @IsEnum(Term)
    term: Term;

    @IsNotEmpty()
    instructorId: number;
}