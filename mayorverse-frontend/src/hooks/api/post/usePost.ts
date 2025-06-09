import {postService} from "@/services/post.service";
import {TPost} from "@/types";
import {useQuery} from "@tanstack/react-query";

export function usePost({
                          postId,
                          userId,
                        }: {
  postId?: string;
  userId?: string;
}) {
  const {data: post} = useQuery<TPost>({
    queryKey: ["post", postId],
    queryFn: async () => await postService.get({
      postId: postId as string,
      userId: userId as string,
    }),
    enabled: !!postId && !!userId
  });

  return {post};
}
