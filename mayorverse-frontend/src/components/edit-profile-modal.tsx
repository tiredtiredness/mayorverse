'use client';

import { ChangeEvent, useState } from 'react';
import { IUser } from '@/types/auth.types';
import { Modal } from '@/components/ui/modal';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { IMAGE_API_URL, IMAGE_TOKEN } from '@/constants';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { useUpdateUser } from '@/hooks/api/user/useUpdateUser';

export function EditProfileModal({
  user,
  isOpen,
  setIsOpen,
}: {
  user: IUser;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  const { register, handleSubmit, formState, setError } = useForm<IUser>();

  const [preview, setPreview] = useState<
    string | StaticImport | null | undefined
  >(user?.avatarUrl);
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl);

  const { updateUser } = useUpdateUser({
    id: user?.id,
    onSuccess: () => setIsOpen(false),
    onError: error =>
      setError('username', {
        type: 'validate',
        message: error.message,
      }),
  });

  const onSubmit = (formData: IUser) => {
    updateUser({ ...formData, avatarUrl });
  };

  const fpf = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const file = e?.target?.files?.[0];
    if (!file) return;

    reader.readAsDataURL(file);

    reader.onload = async readerEvent => {
      const result = readerEvent?.target?.result;
      if (typeof result === 'string') setPreview(result);
      const formData = new FormData();
      formData.append('image', file);
      const responce = await fetch(`${IMAGE_API_URL}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${IMAGE_TOKEN}`,
        },
        body: formData,
      });
      const data = await responce.json();

      setAvatarUrl(data?.data?.link);
    };
  };

  if (!user) return;

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title='Edit Profile'
        size='md'
      >
        <form
          className='flex flex-col gap-3 '
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            label={'Username'}
            {...register('username', { value: user?.username })}
            error={formState.errors['username']?.message as string}
          />
          <Input
            label={'First name'}
            {...register('firstName', { value: user?.firstName })}
          />
          <Input
            label={'Last name'}
            {...register('lastName', { value: user?.lastName })}
          />
          <Input
            label={'Email'}
            {...register('email', { value: user?.email })}
          />
          <Textarea
            label={'Bio'}
            {...register('bio', { value: user?.bio })}
          ></Textarea>
          <div className='space-y-3'>
            <label
              htmlFor='coverImageUrl'
              className='block text-sm font-medium mb-1'
            >
              Image Preview
            </label>
            {preview ? (
              <div className='relative aspect-video w-full rounded-lg overflow-hidden border border-gray-700'>
                <Image
                  src={preview}
                  alt='City preview'
                  fill
                  className='object-cover'
                />
              </div>
            ) : (
              <div className='aspect-video bg-gray-700 rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center'>
                <span className='text-gray-400'>Preview will appear here</span>
              </div>
            )}

            <div>
              <label
                htmlFor='avatarImageUrl'
                className='block text-sm font-medium mb-1'
              >
                Image URL
              </label>
              <input
                type='file'
                id='avatarImageUrl'
                name='avatarImageUrl'
                className='w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focusable focus:border-transparent'
                onChange={fpf}
              />
            </div>
          </div>
          <div className='flex gap-2 justify-end'>
            <Button
              variant='secondary'
              size='lg'
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button variant='primary' size='lg' type='submit'>
              Save
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
