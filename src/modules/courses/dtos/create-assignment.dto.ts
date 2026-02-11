import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreateAssignmentDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Assignment title' })
    title: string;
    
    @IsString()
    @IsOptional()
    @ApiProperty({ description: 'Assignment description' })
    description?: string;
    
    @IsDate()
    @IsOptional()
    @ApiProperty({ description: 'Assignment deadline' })
    deadline?: Date;
    
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ description: 'Course id' })
    courseId: number;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Assignment submission link' })
    submitionLink: string;
}