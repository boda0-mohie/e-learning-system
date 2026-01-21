import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";


export class CreateLessonDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    @IsNumber()
    creatorId: number;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    @IsString()
    videoUrl: string;

    // Duration in seconds
    @IsNotEmpty()
    @IsNumber()
    duration: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    courseId: number;
}