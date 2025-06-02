import { tagService } from '@/services';
import { useMutation } from '@tanstack/react-query';

export function useCreateTag({
  cityId,
  onSuccess,
}: {
  cityId: string;
  onSuccess: () => void;
}) {
  const { mutate: createTag } = useMutation({
    mutationKey: ['tags', cityId],
    mutationFn: async ({ cityId, name }: { cityId: string; name: string }) => {
      return await tagService.createCityTag(cityId, name);
    },
    onSuccess,
  });
  return { createTag };
}
