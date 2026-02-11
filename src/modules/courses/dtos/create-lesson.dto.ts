import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateLessonDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Lesson title' })
    title: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Creator id' })
    creatorId: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Content' })
    content: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Video url' })
    videoUrl: string;

    // Duration in seconds
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Duration in seconds' })
    duration: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @ApiProperty({ description: 'Course id' })
    courseId: number;
}