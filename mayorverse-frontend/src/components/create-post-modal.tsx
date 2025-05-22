'use client';

import { useForm } from 'react-hook-form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button, Modal } from './ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postService } from '@/services/post.service';

export function CreatePostModal({ isOpen, onClose, cityId, userId }) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ['post'],
    mutationFn: async formData => {
      await postService.create({ ...formData, cityId, userId });
    },
    onSuccess() {
      queryClient.invalidateQueries(['city']);
    },
  });

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = formData => {
    mutate(formData);
    reset();
    onClose();
  };

  const onCancel = () => {
    reset();
    onClose();
  };

  return (
    <Modal title='Create Post' isOpen={isOpen} onClose={onCancel}>
      <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
        <Input label='Title' {...register('name')} placeholder='Enter title' />
        <Textarea
          label='Text'
          placeholder='Hey residents! Just wanted to share...'
          {...register('content')}
        />
        <div className='flex gap-2 justify-end'>
          <Button variant='secondary' size='md' onClick={onCancel}>
            Cancel
          </Button>
          <Button variant='primary' size='md' type='submit'>
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
}
