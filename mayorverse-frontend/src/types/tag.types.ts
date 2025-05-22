export interface ITag {
  id: string;
  createdAt: string;
  updatedAt: string;

  cityId: string;
  postId: string;

  name: string;
  type: EnumTagType;
}

enum EnumTagType {
  Post = 'POST',
  City = 'CITY',
}
