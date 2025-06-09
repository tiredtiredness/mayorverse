import { tagService } from "@/services";
import { useMutation } from "@tanstack/react-query";

export function useDeleteTag({
  cityId,
  onSuccess,
}: {
  cityId: string;
  onSuccess: () => void;
}) {
  const { mutate: deleteTag } = useMutation({
    mutationKey: ["tags", cityId],
    mutationFn: async (id: string) => {
      return await tagService.deleteTag(id);
    },
    onSuccess,
  });

  return { deleteTag };
}
