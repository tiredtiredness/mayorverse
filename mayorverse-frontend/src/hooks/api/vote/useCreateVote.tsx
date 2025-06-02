import { voteService } from '@/services/vote.service';
import { ICreateVote } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateVote() {
  const queryClient = useQueryClient();
  const { mutate: createVote } = useMutation({
    mutationKey: ['vote'],
    mutationFn: async ({ userId, pollId, pollOptionIdList }: ICreateVote) =>
      await voteService.vote({
        userId,
        pollId,
        pollOptionIdList,
      }),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['polls'] });
    },
  });

  return { createVote };
}
