import { postService } from '@/services/post.service';
import { IPost } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreatePost({
  cityId,
  userId,
}: {
  cityId: string;
  userId: string;
}) {
  const queryClient = useQueryClient();

  const { mutate: createPost } = useMutation({
    mutationKey: ['post', cityId],
    mutationFn: async (formData: IPost) => {
      await postService.create({ ...formData, cityId, userId });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['city'] });
    },
  });
  return { createPost };
}
