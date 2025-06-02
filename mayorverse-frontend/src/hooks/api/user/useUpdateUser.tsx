import { userService } from '@/services';
import { IUser } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ErrorOption } from 'react-hook-form';

export function useUpdateUser({
  id,
  onSuccess,
  onError,
}: {
  id: string;
  onSuccess: () => void;
  onError: (error: ErrorOption) => void;
}) {
  const queryClient = useQueryClient();
  const { mutate: updateUser } = useMutation({
    mutationKey: ['profile', id],
    mutationFn: async (formData: IUser) => {
      await userService.updateUser({
        ...formData,
        id,
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      onSuccess();
    },
    onError,
  });

  return { updateUser };
}
