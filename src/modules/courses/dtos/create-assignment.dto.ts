import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class CreateAssignmentDto {
    @IsString()
    @IsNotEmpty()
    title: string;
    @IsString()
    @IsOptional()
    description?: string;
    @IsDate()
    @IsOptional()
    deadline?: Date;
    @IsNumber()
    @IsNotEmpty()
    courseId: number;
}