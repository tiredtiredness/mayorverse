import { useForm } from 'react-hook-form';
import { Button, Input, Modal, Textarea } from './ui';
import { useMutation } from '@tanstack/react-query';
import { pollService } from '@/services';

export function CreatePollModal({ isOpen, onClose }) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = formData => {
    mutate(formData);
  };
  const onCancel = () => {
    reset();
    onClose();
  };

  const { mutate } = useMutation({
    mutationKey: ['poll'],
    mutationFn: async formData => {
      await pollService.create({
        ...formData,
        postId: 'cmajl0rt6000044rvxy0r2zhu',
      });
    },
    onSuccess() {
      onCancel();
    },
  });

  return (
    <Modal title='Create Poll' isOpen={isOpen} onClose={onClose}>
      <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
        <Input label='Title' {...register('name')} />
        <Textarea label='Description' rows={3} {...register('description')} />

        <input
          type='datetime-local'
          {...register('endDate', { valueAsDate: true })}
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
