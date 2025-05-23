import { IPoll } from './poll.types';
import { ITag } from './tag.types';

export interface IPost {
  id: string;
  createdAt: string;
  updatedAt: string;
  cityId: string;
  userId: string;
  name: string;
  content: string;
  tags?: ITag[];
  poll: IPoll;
}
