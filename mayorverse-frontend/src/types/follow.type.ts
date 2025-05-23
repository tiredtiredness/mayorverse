import { IUser } from './auth.types';
import { ICity } from './city.types';

export interface IFollow {
  id: string;
  createdAt: string;
  updatedAt: string;

  userId: string;
  cityId: string;
  followerId: string;
  follower: IUser;
  city: ICity;

  followType: EnumFollowType;
}

enum EnumFollowType {
  User = 'USER',
  City = 'CITY',
}
