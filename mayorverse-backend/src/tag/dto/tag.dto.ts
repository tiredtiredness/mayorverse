import { PartialType } from '@nestjs/mapped-types';

export class CreateTagDto {
  cityId?: string;
  postId?: string;

  name: string;
  type: 'POST' | 'CITY';
}

export class UpdateTagDto extends PartialType(CreateTagDto) {}
