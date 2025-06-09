import { tagService } from "@/services";
import { useMutation } from "@tanstack/react-query";

export function useCreateTag({
  cityId,
  onSuccess,
}: {
  cityId?: string;
  onSuccess: () => void;
}) {
  const { mutate: createTag } = useMutation({
    mutationKey: ["tags", cityId],
    mutationFn: async ({
      cityId,
      postId,
      name,
    }: {
      cityId?: string;
      postId?: string;
      name: string;
    }) => {
      return await tagService.createTag({ cityId, postId, name });
    },
    onSuccess,
  });
  return { createTag };
}
