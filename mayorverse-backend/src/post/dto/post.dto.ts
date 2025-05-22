import { PartialType } from '@nestjs/mapped-types';
import { Poll, Tag } from '@prisma/client';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class PostDto {
  @IsString()
  name: string;

  @IsString()
  content: string;

  @IsArray()
  tags?: Tag[];

  @IsArray()
  polls?: Poll[];
}

export class CreatePostDto extends PostDto {
  userId: string;
  cityId: string;
}

export class UpdatePostDto extends PartialType(PostDto) {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  cityId?: string;
}
