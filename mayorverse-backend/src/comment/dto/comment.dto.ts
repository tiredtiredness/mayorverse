import { IsString } from 'class-validator';

export class CommentDto {
  @IsString()
  userId: string;

  @IsString()
  postId: string;

  @IsString()
  parentId?: string;
}

export class CreateCommentDto {
  @IsString()
  userId: string;

  @IsString()
  postId: string;

  @IsString()
  parentId?: string;

  @IsString()
  content: string;
}
export class UpdateCommentDto {}
