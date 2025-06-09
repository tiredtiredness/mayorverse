import {cityService} from "@/services";
import {TCity} from "@/types";
import {useQuery} from "@tanstack/react-query";

export function useCities({name, tags, userId, isFollowing}: {
  name?: string,
  tags?: string[],
  userId?: string,
  isFollowing?: boolean
}) {
  const {data: cities, isLoading} = useQuery<TCity[]>({
    queryKey: ["cities", tags],
    queryFn: async () => await cityService.getCities({
      name, tags, userId, isFollowing
    }),
    enabled: Boolean(name || tags || userId || isFollowing)
  });

  return {cities, isLoading};
}
