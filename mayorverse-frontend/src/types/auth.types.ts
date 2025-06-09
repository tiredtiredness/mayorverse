import { TBase } from "./base.types";
import { TCity } from "./city.types";
import { TFollow } from "./follow.types";
import { TVote } from "./poll.types";
import { TPost } from "./post.types";

export type TRegisterForm = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

export type TLoginForm = {
  username: string;
  password: string;
};

export type TUser = TBase & {
  username: string;
  email: string;
  firstName: string | undefined;
  lastName: string | undefined;
  bio: string | undefined;
  avatarUrl: string | undefined;
  cities: TCity[];
  posts: TPost[];
  votes: TVote[];
  follows: TFollow[];
  followedUsers: TUser[];
};

export type TAuthResponse = {
  accessToken: string;
  user: TUser;
};
