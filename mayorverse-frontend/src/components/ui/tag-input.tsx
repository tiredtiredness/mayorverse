'use client';
import { MouseEvent, useState } from 'react';
import { Input } from './input';
import { Tag } from './tag';
import { useMutation, useQuery } from '@tanstack/react-query';
import { tagService } from '@/services/tag.service';
import { ITag } from '@/types';

export function TagInput({ cityId }: { cityId: string }) {
  const [tagName, setTagName] = useState('');

  const { data: tags, refetch } = useQuery({
    queryKey: ['tags', cityId],
    queryFn: async () => await tagService.getCityTags({ cityId }),
  });

  const { mutate: mutateCreation } = useMutation({
    mutationKey: ['tags', cityId],
    mutationFn: async ({ cityId, name }: { cityId: string; name: string }) => {
      return await tagService.createCityTag(cityId, name);
    },
    onSuccess() {
      refetch();
      setTagName('');
    },
  });

  const { mutate: mutateRemoving } = useMutation({
    mutationKey: ['tags', cityId],
    mutationFn: async (tagId: string) => {
      console.log(tagId);
      return await tagService.deleteCityTag(tagId);
    },
    onSuccess() {
      refetch();
    },
  });

  return (
    <div className='flex flex-col gap-2'>
      <Input
        label='Tags'
        value={tagName}
        onChange={e => setTagName(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            e.preventDefault();
            if (tagName.trim()) mutateCreation({ cityId, name: tagName });
          }
        }}
      />

      <ul className='flex gap-1 flex-wrap'>
        {!!tags?.length
          ? tags?.map((tag: ITag) => (
              <li key={tag.id}>
                <Tag
                  tag={tag}
                  onDelete={(e: MouseEvent<HTMLButtonElement>, id: string) => {
                    e.stopPropagation();
                    e.preventDefault();
                    mutateRemoving(id);
                  }}
                />
              </li>
            ))
          : 'no tags added'}
      </ul>
    </div>
  );
}
