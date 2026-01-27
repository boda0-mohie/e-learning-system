import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { AcademicYear, Major, Term } from "utils/enum";

export class CreateStudentProfileDto {
    @IsNotEmpty()
    @IsEnum(AcademicYear)
    academicYear: AcademicYear;
    
    @IsNotEmpty()
    @IsEnum(Major)
    major: Major;
    
    @IsNotEmpty()
    @IsEnum(Term)
    term: Term;
    
    @IsOptional()
    @IsString()
    photo: string;
}