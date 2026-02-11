import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateLessonDto {
    @IsString()
    @IsOptional()
    @ApiProperty({ description: 'Lesson title' })
    title?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ description: 'Lesson description' })
    description?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ description: 'Lesson video url' })
    videoUrl?: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ description: 'Lesson id' })
    lessonId: number;

    @IsString()
    @IsOptional()
    @ApiProperty({ description: 'Lesson content' })
    content?: string;

    @IsOptional()
    @IsNumber()
    @ApiProperty({ description: 'Lesson duration' })
    duration?: number;
}