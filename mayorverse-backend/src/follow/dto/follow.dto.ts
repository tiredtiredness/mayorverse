import { IsEnum, IsString } from 'class-validator';

const FollowType = {
  USER: 'USER',
  CITY: 'CITY',
} as const;

export type FollowType = (typeof FollowType)[keyof typeof FollowType];

export class CreateFollowDto {
  @IsString()
  userId?: string;

  @IsString()
  cityId?: string;

  @IsString()
  followerId: string;

  @IsEnum(FollowType)
  followType: FollowType;
}
