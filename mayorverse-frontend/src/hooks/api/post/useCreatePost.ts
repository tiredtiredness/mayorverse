import {postService} from "@/services/post.service";
import {TPost} from "@/types";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export function useCreatePost({
                                cityId,
                                userId,
                              }: {
  cityId: string;
  userId: string;
}) {
  const queryClient = useQueryClient();

  const {mutate: createPost} = useMutation({
    mutationKey: ["post", cityId],
    mutationFn: async (formData: TPost) => {
      await postService.create({...formData, cityId, userId});
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ["city", cityId]});
    },
  });
  return {createPost};
}
