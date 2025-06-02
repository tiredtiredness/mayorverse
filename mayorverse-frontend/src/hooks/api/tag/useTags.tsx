import { tagService } from '@/services';
import { ITag } from '@/types';
import { useQuery } from '@tanstack/react-query';

export function useTags({
  cityId,
  popular,
}: {
  cityId?: string;
  popular?: boolean;
}) {
  const { data: tags, refetch } = useQuery<ITag[]>({
    queryKey: ['tags', cityId, popular],
    queryFn: async () => {
      return await tagService.getCityTags({ cityId, popular });
    },
  });

  return { tags, refetch };
}
