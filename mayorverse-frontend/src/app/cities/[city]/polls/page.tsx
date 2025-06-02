'use client';

import { Poll } from '@/components/poll';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { AddSquare, Star } from '@solar-icons/react';
import { CreatePollModal } from '@/components/create-poll-modal';
import { createPortal } from 'react-dom';
import { IPoll } from '@/types';
import { useCity } from '@/hooks/api/city/useCity';
import { usePolls } from '@/hooks/api/poll/usePolls';

export default function PollsTab() {
  const params = useParams();

  const [isOpen, setIsOpen] = useState(false);

  const { city } = useCity(params?.city as string);

  const { polls, isLoading } = usePolls(city?.id);

  const modal = city && (
    <CreatePollModal
      isOpen={!!isOpen}
      onClose={() => setIsOpen(false)}
      cityId={city.id}
    />
  );

  return (
    <div className='space-y-6'>
      {isOpen !== undefined && createPortal(modal, globalThis.document.body)}
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-bold'>Community Polls</h1>
          <p className='text-gray-400'>
            Vote on current issues in {city?.name}
          </p>
        </div>
        <Button variant='primary' size='sm' onClick={() => setIsOpen(true)}>
          <div className='flex gap-1 items-center'>
            <AddSquare className='w-4 h-4' />
            <p>New Poll</p>
          </div>
        </Button>
      </div>
      {!!city ? (
        <div className='grid gap-4'>
          {polls?.map((poll: IPoll) => (
            <Poll key={poll?.id} poll={poll} isLoading={isLoading} />
          ))}
        </div>
      ) : (
        <div className='text-center py-12'>
          <div className='mx-auto w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mb-4'>
            <Star className='w-10 h-10 text-gray-500' />
          </div>
          <h3 className='text-xl font-medium mb-2'>No active polls</h3>
          <p className='text-gray-400 max-w-md mx-auto'>
            There are no active polls in {city?.name} yet. Be the first to
            create one!
          </p>
          <Button className='mt-4' variant='primary'>
            <div className='flex items-center gap-2'>
              <AddSquare className='w-5 h-5' />

              <p>Create Poll</p>
            </div>
          </Button>
        </div>
      )}
    </div>
  );
}
