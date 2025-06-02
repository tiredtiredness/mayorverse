import { cityService } from '@/services';
import { ICity } from '@/types';
import { useMutation } from '@tanstack/react-query';

export function useCreateCity({ onSuccess }: { onSuccess: () => void }) {
  const { mutate, isPending: isLoading } = useMutation({
    mutationKey: ['city'],
    mutationFn: (formData: ICity) => cityService.createCity(formData),
    onSuccess,
  });

  return { mutate, isLoading };
}
