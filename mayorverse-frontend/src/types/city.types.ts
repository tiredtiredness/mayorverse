import {TUser} from "./auth.types";
import {TBase} from "./base.types";
import {TFollow} from "./follow.types";
import {TPoll} from "./poll.types";
import {TPost} from "./post.types";
import {TTag} from "./tag.types";

export type TCity = TBase & {
  tags?: TTag[];
  name: string;
  description: string;
  map: string | null;
  population: number;
  avatarUrl: string | null;
  mayorId: string;
  posts: TPost[];
  follows?: TFollow[];
  followersCount: number;
  mayor: TUser;
  polls: TPoll[];
};

export type TCreateCity = {
  name: string;
  description: string;
  population: string;
  avatarUrl: string;
};
