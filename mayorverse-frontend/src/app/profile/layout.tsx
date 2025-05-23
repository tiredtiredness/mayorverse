'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { TabNav } from '@/components/tab-nav';
import { City, CupStar, Heart, Settings } from '@solar-icons/react';
import { Skeleton } from '@/components/ui/skeleton';
import { EditProfileModal } from '@/components/edit-profile-modal';
import { JSX, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

const tabs = [
  {
    title: 'Favorites',
    icon: <Heart className='w-5 h-5' />,
    href: '/profile/favorites',
  },
  {
    title: 'My Cities',
    icon: <City className='w-5 h-5' />,
    href: '/profile/cities',
  },
];

export default function Profile({ children }: { children: JSX.Element }) {
  const { user, isLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='min-h-[calc(100dvh_-_48px_-_66px)] p-4 text-white '>
      <div className='relative mb-6'>
        <div className='absolute inset-0 bg-gradient-to-r from-gray-900 to-teal-900/30 rounded-xl' />
        <div className='relative z-10 p-6 flex flex-col md:flex-row gap-6'>
          <div className='flex-shrink-0'>
            <div className='relative w-[120px] h-[120px] '>
              {isLoading ? (
                <Skeleton width={120} height={120} rounded='full' />
              ) : user?.avatarUrl ? (
                <Image
                  src={user?.avatarUrl}
                  alt='Avatar'
                  fill={true}
                  objectFit='cover'
                  placeholder='empty'
                  className='rounded-full border-4 border-white/20 shadow-lg'
                />
              ) : null}
              <div className='absolute bottom-0 right-0 bg-teal-600 rounded-full p-1.5 border-2 border-gray-900'>
                <CupStar className='w-5 h-5 text-white' />
              </div>
            </div>
          </div>

          <div className='flex-grow'>
            <div className='flex justify-between items-start'>
              <div>
                {isLoading ? (
                  <Skeleton width={240} height={43} />
                ) : (
                  <h1 className='text-2xl font-bold'>{user?.username} </h1>
                )}
                {isLoading ? (
                  <Skeleton width={240} height={16} />
                ) : (
                  <p className='text-gray-400'>{user?.email}</p>
                )}
              </div>
              {!isLoading && (
                <>
                  <Button
                    variant='secondary'
                    size='sm'
                    className='flex items-center gap-2'
                    onClick={() => setIsOpen(true)}
                  >
                    <Settings className='w-4 h-4' />
                    Edit Profile
                  </Button>
                  <EditProfileModal
                    user={user!}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                  />
                </>
              )}
            </div>

            <p className='my-3 text-gray-300'>{user?.bio}</p>

            <div className='flex flex-wrap gap-4 mt-4'>
              <div className='bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-700'>
                <p className='text-sm text-gray-400'>Cities Founded</p>

                {isLoading ? (
                  <Skeleton width={'100%'} height={20} />
                ) : (
                  <p className='text-xl font-bold'>{user?.cities?.length}</p>
                )}
              </div>

              <div className='bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-700'>
                <p className='text-sm text-gray-400'>Followers</p>
                <p className='text-xl font-bold'>
                  {user?.followedUsers?.length}
                </p>
              </div>
              <div className='bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-700'>
                <p className='text-sm text-gray-400'>Following</p>
                <p className='text-xl font-bold'>
                  {
                    user?.follows?.filter(
                      follow => follow.followType !== 'CITY'
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
        <div className='lg:col-span-1 space-y-4'>
          <div className='bg-gray-800/60 backdrop-blur-sm p-4 rounded-xl border border-gray-700'>
            <h3 className='font-semibold mb-3 flex items-center gap-2'>
              <Settings className='w-5 h-5' />
              Account Details
            </h3>
            <div className='space-y-3 text-sm'>
              <div>
                <p className='text-gray-400'>Member since</p>
                {isLoading ? (
                  <Skeleton width={240} height={20} />
                ) : (
                  <p>
                    {new Date(user!.createdAt?.toString()).toLocaleDateString(
                      'en-US',
                      {
                        day: '2-digit',
                        year: 'numeric',
                        month: 'long',
                      }
                    )}
                  </p>
                )}
              </div>
              <div>
                <p className='text-gray-400'>Last active</p>
                <p>Some hours ago</p>
              </div>
            </div>
          </div>

          <div className='bg-gray-800/60 backdrop-blur-sm p-4 rounded-xl border border-gray-700'>
            <h3 className='font-semibold mb-3'>Achievements</h3>
            TBD
          </div>
        </div>

        <div className='lg:col-span-3'>
          <TabNav tabs={tabs} />

          {children}
        </div>
      </div>
    </div>
  );
}
