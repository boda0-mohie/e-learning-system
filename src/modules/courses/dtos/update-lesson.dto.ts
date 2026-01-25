import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateLessonDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    videoUrl?: string;

    @IsNumber()
    @IsNotEmpty()
    lessonId: number;

    @IsString()
    @IsOptional()
    content?: string;

    @IsOptional()
    @IsNumber()
    duration: number;
}