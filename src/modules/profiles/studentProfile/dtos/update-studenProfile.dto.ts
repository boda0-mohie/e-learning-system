import { IsEnum, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { AcademicYear, Major, Term } from "utils/enum";

export class UpdateStudentProfileDto {
    @IsOptional()
    @IsEnum(Major)
    @ApiProperty({ description: 'Student major' })
    major?: Major;

    @IsOptional()
    @IsEnum(AcademicYear)
    @ApiProperty({ description: 'Student photo' })
    academicYear?: AcademicYear;

    @IsOptional()
    @IsEnum(Term)
    @ApiProperty({ description: 'Student photo' })
    term?: Term;

    @IsOptional()
    @ApiProperty({ description: 'Student photo' })
    gpa?: number;
}