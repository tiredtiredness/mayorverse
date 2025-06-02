import { cityService } from '@/services';
import { ICity } from '@/types';
import { useQuery } from '@tanstack/react-query';

export function useCities(name, tags) {
  const { data: cities, isLoading } = useQuery<ICity[]>({
    queryKey: ['cities', { tags }],
    queryFn: () => cityService.getCities({ name, tags }),
  });

  return { cities, isLoading };
}
