import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @MinLength(3, {
    message: 'Password must be at least 3 characters',
  })
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  @MinLength(4, { message: 'Username must be at least 4 characters' })
  @MaxLength(25, { message: 'Username must not exceed 25 characters' })
  username: string;
}
