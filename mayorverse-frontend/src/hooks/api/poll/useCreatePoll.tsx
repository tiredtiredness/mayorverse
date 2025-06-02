import { pollService } from '@/services';
import { pollOptionService } from '@/services/pollOption.service';
import { IPoll } from '@/types';
import { useMutation } from '@tanstack/react-query';

export function useCreatePoll({
  postId,
  cityId,
  onSuccess,
}: {
  postId: string;
  cityId: string;
  onSuccess: () => void;
}) {
  const { mutate: createPollOptions, isPending: isCreatingOptions } =
    useMutation({
      mutationKey: ['pollOption'],
      mutationFn: async ({
        options,
        pollId,
      }: {
        options: string[];
        pollId: string;
      }) => {
        console.log({ pollId });
        await pollOptionService.createOptions(options, pollId);
      },
    });

  const { mutate: createPoll, isPending: isCreatingPoll } = useMutation({
    mutationKey: ['poll'],
    mutationFn: async ({ formData, options }) => {
      // Сначала создаем опрос
      const createdPoll = await pollService.create({
        ...formData,
        postId,
        cityId,
      });

      console.log({ formData, options });

      if (options && options?.length > 0) {
        createPollOptions({
          options,
          pollId: createdPoll.id,
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
