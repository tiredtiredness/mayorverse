import {commentService} from "@/services/comment.service";
import {TCreateComment} from "@/types/comment.types";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export function useCreateComment() {
  const queryClient = useQueryClient();
  const {mutate: createComment} = useMutation({
    mutationFn: async (comment: TCreateComment) =>
      await commentService.create(comment),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({queryKey: ["comments", data?.postId]});
    },
  });
  return {createComment};
}
