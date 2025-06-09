import {likeService} from "@/services/like.service";
import {TCreateLike} from "@/types";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export function useToggleLike(postId: string) {
  const queryClient = useQueryClient();
  const {mutate: toggleLike} = useMutation({
    mutationFn: async (data: TCreateLike) => await likeService.create(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ["post", postId]});
      await queryClient.invalidateQueries({queryKey: ["posts"]});
      await queryClient.invalidateQueries({queryKey: ["comments", postId]});
    },
  });
  return {toggleLike};
}
