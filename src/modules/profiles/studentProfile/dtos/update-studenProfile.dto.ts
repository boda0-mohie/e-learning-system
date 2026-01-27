import { IsOptional, IsString } from "class-validator";

export class UpdateStudentProfileDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    photo?: string;

}