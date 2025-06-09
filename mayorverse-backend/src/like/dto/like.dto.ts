import { IsOptional, IsString } from 'class-validator';

export class LikeDto {
  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  postId?: string;

  @IsOptional()
  @IsString()
  cityId?: string;

  @IsOptional()
  @IsString()
  commentId?: string;

  likeType: 'CITY' | 'POST' | 'COMMENT';
}
