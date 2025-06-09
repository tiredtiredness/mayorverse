import {useAuth} from "@/hooks/useAuth";
import {followService} from "@/services";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export function useCreateCityFollow(cityId?: string) {
  const {user} = useAuth();
  const queryClient = useQueryClient();
  const cityFollow = user?.follows.find((follow) => follow.cityId === cityId);
  const isFollowingCity = !!cityFollow;
  const {mutate} = useMutation({
    mutationKey: ["city", cityId],
    mutationFn: async () => {
      if (!user || !cityId) return;
      if (isFollowingCity) {
        await followService.unfollow(cityFollow.id);
      } else {
        await followService.follow({
          followerId: user.id,
          cityId,
          followType: 'CITY'
        });
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ["city", cityId]});
      await queryClient.invalidateQueries({queryKey: ["profile"]});
    },
  });

  return {mutate};
}
