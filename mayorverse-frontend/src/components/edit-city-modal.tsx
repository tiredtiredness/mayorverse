'use client';

import { ICity } from '@/types/city.types';
import { Modal } from './ui/modal';
import { Input } from './ui/input';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { TagInput } from './ui/tag-input';
import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import { Textarea } from './ui/textarea';
import { IMAGE_API_URL, IMAGE_TOKEN } from '@/constants';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { useUpdateCity } from '@/hooks/api/city/useUpdateCity';

export function EditCityModal({
  city,
  isOpen,
  setIsOpen,
}: {
  city: ICity;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  const { register, handleSubmit } = useForm<ICity>();

  const { updateCity } = useUpdateCity(city.id);

  const [preview, setPreview] = useState<string | StaticImport | null>(
    city?.avatarUrl
  );
  const [avatarUrl, setAvatarUrl] = useState(city?.avatarUrl);

  const onSubmit = (formData: ICity) => updateCity({ ...formData, avatarUrl });

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

  return (
    <Modal
      size='md'
      title={`Edit ${city?.name} city`}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <form
        action=''
        className='flex flex-col gap-3'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input label='City name' {...register('name', { value: city?.name })} />
        <TagInput cityId={city?.id} />
        <Textarea
          label='Description'
          {...register('description', { value: city?.description })}
        />
        <Input label='Map' {...register('map', { value: city?.map })} />
        <Input
          label='Population'
          {...register('population', {
            value: city.population,
            valueAsNumber: true,
          })}
        />
        <div className='space-y-4'>
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
              htmlFor='coverImageUrl'
              className='block text-sm font-medium mb-1'
            >
              Image URL
            </label>
            <input
              type='file'
              id='coverImageUrl'
              name='coverImageUrl'
              className='w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
              onChange={fpf}
            />
          </div>
        </div>
        <div className='flex gap-2 justify-end'>
          <Button variant='secondary' size='lg'>
            Cancel
          </Button>
          <Button variant='primary' size='lg' type='submit'>
            Save
          </Button>
        </div>
        <div className='bg-gray-800 p-6 rounded-xl border border-gray-700'>
          <h2 className='text-xl font-semibold mb-4'>City Cover Image</h2>
        </div>
      </form>
    </Modal>
  );
}
