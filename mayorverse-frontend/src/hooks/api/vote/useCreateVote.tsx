import {voteService} from "@/services/vote.service";
import {TCreateVote} from "@/types";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export function useCreateVote() {
  const queryClient = useQueryClient();
  const {mutate: createVote} = useMutation({
    mutationKey: ["vote"],
    mutationFn: async ({userId, pollId, pollOptionIdList}: TCreateVote) =>
      await voteService.vote({
        userId,
        pollId,
        pollOptionIdList,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ["polls"]});
    },
  });

  return {createVote};
}
