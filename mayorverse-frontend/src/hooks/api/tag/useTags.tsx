import {tagService} from "@/services";
import {TTag} from "@/types";
import {useQuery} from "@tanstack/react-query";

export function useTags({
                          cityId,
                          postId,
                          popular,
                        }: {
  cityId?: string;
  postId?: string;
  popular?: boolean;
}) {
  const {data: tags, refetch} = useQuery<TTag[]>({
    queryKey: ["tags", cityId, postId, popular],
    queryFn: async () => {
      return await tagService.getTags({cityId, postId, popular});
    },
  });

  return {tags, refetch};
}
