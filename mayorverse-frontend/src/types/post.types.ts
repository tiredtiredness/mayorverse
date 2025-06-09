import { TUser } from "./auth.types";
import { TLike } from "./like.types";
import { TPoll } from "./poll.types";
import { TTag } from "./tag.types";

export type TPost = {
  id: string;
  createdAt: string;
  updatedAt: string;
  cityId: string;
  userId: string;
  name: string;
  content: string;
  tags?: TTag[];
  poll: TPoll;
  imageUrl?: string;
  user: TUser;
  likes?: TLike[];
  likesCount: number;
  isLiked: boolean;
  commentsCount: number;
};

export type TCreatePost = {
  cityId: string;
  userId: string;
};
