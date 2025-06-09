import {pollOptionService} from "@/services/pollOption.service";
import {useMutation} from "@tanstack/react-query";

export function useCreatePollOption(pollId: string) {
  const {mutate: createPollOption, isPending: isLoading} = useMutation({
    mutationKey: ["pollOption"],
    mutationFn: async (options: string[]) =>
      await pollOptionService.createOptions(options, pollId),
  });

  return {createPollOption, isLoading};
}
