import { TUser } from "./auth.types";
import { TBase } from "./base.types";
import { TLike } from "./like.types";

export type TComment = TBase & {
  userId: string;
  postId: string;
  parentId?: string;
  parent?: TComment;
  content: string;
  user: TUser;
  likes: TLike[];
  isLiked: boolean;
  replies: TComment[];
};

export type TCreateComment = {
  userId: string;
  postId: string;
  parentId?: string;
  content: string;
};
