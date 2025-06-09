import {TUser} from "./auth.types";
import {TBase} from "./base.types";
import {TCity} from "./city.types";

export type TFollow = TBase & {
  userId: string;
  cityId: string;
  followerId: string;
  follower: TUser;
  city: TCity;
  followType: TFollowType;
};

export type TCreateFollow = {
  followerId: string;
  userId?: string;
  cityId?: string;
  followType: TFollowType;
};

const TFollowType = {
  USER: "USER",
  CITY: "CITY",
} as const;

export type TFollowType = (typeof TFollowType)[keyof typeof TFollowType];
