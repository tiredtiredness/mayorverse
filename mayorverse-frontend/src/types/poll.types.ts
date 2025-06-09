import {TBase} from "./base.types";

export type TPoll = TBase & {
  postId: string;
  cityId: string;
  name: string;
  description: string;
  endDate: string;
  isMultiple: boolean;
  pollOptions: TPollOption[];
  votes: TVote[];
};

export type TPollOption = TBase & {
  pollId: string;
  name: string;
  order: number;
};

export type TVote = TBase & {
  userId: string;
  pollId: string;
  pollOptionId: string;
};

export type TCreatePoll = Omit<TPoll, keyof TBase | "votes" | "pollOptions">;

export type TCreateVote = {
  userId: string;
  pollId: string;
  pollOptionIdList: string[]
};
