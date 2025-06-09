import {pollService} from "@/services";
import {useQuery} from "@tanstack/react-query";

export function usePolls(cityId: string) {
  const {data: polls, isLoading} = useQuery({
    queryKey: ["polls", cityId],
    queryFn: async () => await pollService.getCityPolls(cityId),
  });

  return {polls, isLoading};
}
