import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @IsEmail()
    @MaxLength(150)
    @IsNotEmpty()
    @ApiProperty({ description: 'User email' })
    email: string;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @ApiProperty({ description: 'User password' })
    password: string;
}