import { IUser } from './auth.types';
import { IFollow } from './follow.type';
import { IPost } from './post.types';
import { ITag } from './tag.types';

export interface ICity {
  tags: ITag[];
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  map: string | null;
  population: number | null;
  avatarUrl: string | null;
  mayorId: string;
  posts: IPost[];
  follows?: IFollow[];
  _count: { follows: number };
  mayor: IUser[];
}
