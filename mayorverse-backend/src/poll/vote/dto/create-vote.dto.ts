import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';

export class CreateVoteDto {
  @IsString()
  userId: string;

  @IsString()
  pollId: string;

  @IsString()
  pollOptionId: string;
}

export class UpdateVoteDto extends PartialType(CreateVoteDto) {
  @IsString()
  pollOptionId: string;
}
