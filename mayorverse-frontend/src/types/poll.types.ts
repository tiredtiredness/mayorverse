export interface IPoll {
  id: string;
  createdAt: string;
  updatedAt: string;

  postId: string;
  cityId: string;

  name: string;
  description: string;
  endDate: string;
  isMultiple: boolean;

  pollOptions: IPollOption[];
  votes: IVote[];
}

export interface IPollOption {
  id: string;
  createdAt: string;
  updatedAt: string;

  pollId: string;

  name: string;
  order: number;
}

export interface IVote {
  id: string;
  createdAt: string;
  updatedAt: string;

  userId: string;
  pollId: string;
  pollOptionIdList: string[];
}

export type ICreateVote = Partial<IVote>;
