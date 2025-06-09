import {TBase} from "./base.types";

export const LikeType = {
  CITY: "CITY",
  POST: "POST",
  COMMENT: "COMMENT",
} as const;

export type TLikeType = (typeof LikeType)[keyof typeof LikeType];

type TLikeBase = TBase & {
  userId: string;
  likeType: TLikeType;
};

export type TLike =
  | (TLikeBase & {
  likeType: typeof LikeType.CITY;
  cityId: string;
  postId?: never;
  commentId?: never;
})
  | (TLikeBase & {
  likeType: typeof LikeType.POST;
  postId: string;
  cityId?: never;
  commentId?: never;
})
  | (TLikeBase & {
  likeType: typeof LikeType.COMMENT;
  commentId: string;
  cityId?: never;
  postId?: never;
});

export type TCreateLike = Omit<TLike, keyof TBase>;
