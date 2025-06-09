import {commentService} from "@/services/comment.service";
import {TComment} from "@/types/comment.types";
import {useQuery} from "@tanstack/react-query";

export function useComment(postId?: string) {
  const {data: comments} = useQuery<TComment[]>({
    queryKey: ["comments", postId],
    queryFn: async () => {
      if (!postId) {
        return [];
      }
      return await commentService.getAll({postId})
    },
    enabled: !!postId
  });

  return {comments};
}
