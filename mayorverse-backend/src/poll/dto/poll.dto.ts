import { PartialType } from '@nestjs/mapped-types';
import { PollOption } from '@prisma/client';
import { IsArray, IsString } from 'class-validator';

export class CreatePollDto {
  @IsString()
  postId?: string;

  @IsString()
  cityId?: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  endDate: string;

  @IsString()
  isMultiple: boolean;

  @IsArray()
  pollOptions: PollOption[];
}

export class UpdatePollDto extends PartialType(CreatePollDto) {}
