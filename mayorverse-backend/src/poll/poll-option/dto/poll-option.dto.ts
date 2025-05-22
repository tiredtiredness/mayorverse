import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';

export class CreatePollOptionDto {
  @IsString()
  pollId: string;

  @IsString()
  name: string;

  @IsNumber()
  order: number;
}

export class UpdatePollOptionDto extends PartialType(CreatePollOptionDto) {}
