import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { AcademicYear, Major, Term } from "utils/enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateStudentProfileDto {
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
    
    @IsOptional()
    @IsString()
    photo: string;
}