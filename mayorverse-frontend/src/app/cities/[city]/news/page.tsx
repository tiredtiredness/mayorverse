'use client';

import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { AddSquare, Calendar, PenNewSquare } from '@solar-icons/react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { cityService } from '@/services/city.service';
import { ICity } from '@/types/city.types';
import { createPortal } from 'react-dom';
import { CreatePostModal } from '@/components/create-post-modal';
import { useAuth } from '@/hooks/useAuth';
import { Post } from '@/components/post';

export default function NewsTab() {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const { city: cityId } = params;
  const { user } = useAuth();

  const { data: city, isLoading } = useQuery<ICity>({
    queryKey: ['city'],
    queryFn: async () => await cityService.getCity(cityId as string),
  });

  const news = city?.posts;

  if (!city) return null;

  const modal = (
    <CreatePostModal
      isOpen={!!isOpen}
      onClose={() => setIsOpen(false)}
      title={'New post'}
      userId={city.mayorId}
      cityId={city.id}
    />
  );

  return (
    <>
      {isOpen !== undefined && createPortal(modal, globalThis.document.body)}
      <div className='space-y-6'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
          <div>
            <h1 className='text-2xl font-bold'>Latest News from {city.name}</h1>
            <p className='text-gray-400'>
              Stay updated with city announcements and events
            </p>
          </div>
          {user?.id === city?.mayorId && (
            <Button
              variant='primary'
              size='sm'
              icon={<PenNewSquare className='w-4 h-4' />}
              onClick={() => setIsOpen(true)}
            >
              Post News
            </Button>
          )}
        </div>

        {news ? (
          <ul className='grid gap-6'>
            {news?.map((post, index) => (
              <li key={post.id}>
                <Post post={post} isLoading={isLoading} index={index} />
              </li>
            ))}
          </ul>
        ) : (
          <div className='text-center py-12'>
            <div className='mx-auto w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-4'>
              <Calendar className='w-10 h-10 text-gray-600' />
            </div>
            <h3 className='text-xl font-medium mb-2'>No news yet</h3>
            <p className='text-gray-400 max-w-md mx-auto'>
              There are no news posts for {city.name} yet. Be the first to share
              an update!
            </p>
            <Button
              className='mt-4'
              variant='primary'
              icon={<AddSquare className='w-5 h-5' />}
            >
              Create News Post
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
