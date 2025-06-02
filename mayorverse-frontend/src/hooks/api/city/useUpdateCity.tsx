import { cityService } from '@/services';
import { ICity } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateCity(cityId: string) {
  const queryClient = useQueryClient();
  const { mutate: updateCity } = useMutation({
    mutationKey: ['city', cityId],
    mutationFn: async (formData: ICity) => {
      await cityService.updateCity({ ...formData, id: cityId });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['city', cityId] });
    },
  });

  return { updateCity };
}
