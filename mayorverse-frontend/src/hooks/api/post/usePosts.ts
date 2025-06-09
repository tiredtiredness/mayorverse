import {postService} from "@/services/post.service";
import {TPost} from "@/types";
import {useQuery} from "@tanstack/react-query";

export function usePosts({
                           cityId,
                           userId,
                         }: {
  cityId?: string;
  userId?: string;
}) {
  const {data: posts} = useQuery<TPost[]>({
    queryKey: ["posts", cityId],
    queryFn: async () => {
      if (!cityId && !userId) {
        return [];
      }
      return await postService.getAll({
        cityId: cityId!,
        userId: userId!
      })

    },
    enabled: !!cityId && !!userId
  });

  return {posts};
}
