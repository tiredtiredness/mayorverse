'use client';

import { MouseEvent, useState } from 'react';
import { Input } from './input';
import { Tag } from './tag';
import { ITag } from '@/types';
import { useTags } from '@/hooks/api/tag/useTags';
import { useCreateTag } from '@/hooks/api/tag/useCreateTag';
import { useDeleteTag } from '@/hooks/api/tag/useDeleteTag';

export function TagInput({ cityId }: { cityId: string }) {
  const [tagName, setTagName] = useState('');

  const { tags, refetch } = useTags({ cityId });

  const { createTag } = useCreateTag({
    cityId,
    onSuccess: () => {
      refetch();
      setTagName('');
    },
  });

  const { deleteTag } = useDeleteTag({
    cityId,
    onSuccess: refetch,
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
            if (tagName.trim()) createTag({ cityId, name: tagName });
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
                    deleteTag(id);
                  }}
                />
              </li>
            ))
          : 'no tags added'}
      </ul>
    </div>
  );
}
