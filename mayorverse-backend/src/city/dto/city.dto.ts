import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateCityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  map?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  population?: number;

  @IsOptional()
  @IsString()
  avatarUrl?: string;
}

export class UpdateCityDto extends PartialType(CreateCityDto) {}
