export type TTag = {
  id: string;
  createdAt: string;
  updatedAt: string;

  cityId: string;
  postId: string;

  name: string;
  type: TTagType;
};

export type TCreateTag = {
  name: string;
  cityId: string;
};

const TTagType = {
  POST: "POST",
  CITY: "CITY",
} as const;

export type TTagType = (typeof TTagType)[keyof typeof TTagType];
