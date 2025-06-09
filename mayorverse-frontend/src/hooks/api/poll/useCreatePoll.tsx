import {pollService} from "@/services";
import {pollOptionService} from "@/services/pollOption.service";
import {useMutation} from "@tanstack/react-query";
import {TCreatePoll} from "@/types";

export function useCreatePoll({
                                onSuccess,
                              }: {
  onSuccess: () => void;
}) {
  const {mutate: createPollOptions, isPending: isCreatingOptions} =
    useMutation({
      mutationKey: ["pollOption"],
      mutationFn: async ({
                           pollOptions,
                           pollId,
                         }: {
        pollOptions?: string[];
        pollId?: string;
      }) => {
        await pollOptionService.createOptions(pollOptions, pollId);
      },
    });

  const {mutate: createPoll, isPending: isCreatingPoll} = useMutation({
    mutationKey: ["poll"],
    mutationFn: async ({
                         formData,
                         pollOptions
                       }: { formData: TCreatePoll, pollOptions: string[] }) => {
      const createdPoll = await pollService.create(formData);

      if (pollOptions && pollOptions?.length > 0) {
        createPollOptions({
          pollOptions,
          pollId: createdPoll?.id,
        });
      }

      return createdPoll;
    },
    onSuccess,
  });

  return {
    createPoll,
    isLoading: isCreatingPoll || isCreatingOptions,
  };
}
