import {postService} from "@/services/post.service";
import {TPost} from "@/types";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export function useEditPost({
                              postId,
                              cityId,
                              userId,
                            }: {
  postId: string;
  cityId: string;
  userId: string;
}) {
  const queryClient = useQueryClient();

  const {mutate: editPost} = useMutation({
    mutationKey: ["post", cityId],
    mutationFn: async (formData: TPost) => {
      await postService.edit({...formData, id: postId, cityId, userId});
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ["city"]});
      await queryClient.invalidateQueries({queryKey: ["post", postId]});
    },
  });
  return {editPost};
}
