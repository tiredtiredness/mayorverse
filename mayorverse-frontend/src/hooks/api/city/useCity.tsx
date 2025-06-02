import { cityService } from '@/services';
import { ICity } from '@/types';
import { useQuery } from '@tanstack/react-query';

export function useCity(cityId: string) {
  const {
    data: city,
    isLoading,
    refetch,
  } = useQuery<ICity>({
    queryKey: ['city', cityId],
    queryFn: async () => await cityService.getCity(cityId as string),
  });

  return { city, isLoading, refetch };
}
