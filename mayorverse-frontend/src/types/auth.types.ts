import { ICity } from './city.types';
import { IFollow } from './follow.type';
import { IVote } from './poll.types';
import { IPost } from './post.types';

export interface IRegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

export interface ILoginForm {
  username: string;
  password: string;
}

export interface IUser {
  id: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  email: string;
  firstName: string | undefined;
  lastName: string | undefined;
  bio: string | undefined;
  avatarUrl: string | undefined;
  cities: ICity[];
  posts: IPost[];
  votes: IVote[];
  follows: IFollow[];
  followedUsers: IUser[];
}

export interface IAuthResponse {
  accessToken: string;
  user: IUser;
}
