export interface IFollow {
  id: string;
  createdAt: string;
  updatedAt: string;

  userId: string;
  cityId: string;
  followerId: string;

  followType: EnumFollowType;
}

enum EnumFollowType {
  User = 'USER',
  City = 'CITY',
}
