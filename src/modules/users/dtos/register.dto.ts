import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsEmail()
  @MaxLength(150)
  @IsNotEmpty()
  @ApiProperty({ description: 'User email' })
  email: string;

  @MinLength(3)
  @IsNotEmpty()
  @ApiProperty({ description: 'User name' })
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @ApiProperty({ description: 'User password' })
  password: string;
}
