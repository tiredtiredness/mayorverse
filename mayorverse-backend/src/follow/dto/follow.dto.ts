import { IsEnum, IsString } from 'class-validator';

enum EnumFollowType {
  'CITY',
  'USER',
}

export class CreateFollowDto {
  @IsString()
  userId?: string;

  @IsString()
  cityId?: string;

  @IsString()
  followerId: string;

  @IsEnum(['USER', 'CITY'])
  followType: 'USER' | 'CITY';
}
