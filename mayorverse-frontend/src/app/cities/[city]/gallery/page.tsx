'use client';

import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Camera, Gallery, Map, UsersGroupRounded } from '@solar-icons/react';
import { useCity } from '@/hooks/api/city/useCity';

// Mock gallery data type
type GalleryImage = {
  id: string;
  title: string;
  url: string;
  description?: string;
  uploadDate: string;
  author: {
    name: string;
    avatar: string;
  };
  likes: number;
  tags?: string[];
  category: 'landscape' | 'architecture' | 'event' | 'people';
};

// Mock gallery data generator
const generateMockGallery = (): GalleryImage[] => {
  return [
    {
      id: '1',
      title: 'Sunset Over Downtown',
      url: '/city-sunset.jpg',
      description: 'Beautiful evening view of the city skyline',
      uploadDate: '2023-06-10',
      author: {
        name: 'Alex Photographer',
        avatar: '/photographer-avatar.jpg',
      },
      likes: 124,
      tags: ['sunset', 'skyline', 'downtown'],
      category: 'landscape',
    },
    {
      id: '2',
      title: 'New City Hall Building',
      url: '/city-hall.jpg',
      description: 'Modern architecture of our new city hall',
      uploadDate: '2023-05-22',
      author: {
        name: 'Maria Architect',
        avatar: '/architect-avatar.jpg',
      },
      likes: 89,
      tags: ['architecture', 'government'],
      category: 'architecture',
    },
    {
      id: '3',
      title: 'Annual Food Festival',
      url: '/food-festival.jpg',
      description: 'Crowds enjoying local cuisine at the main square',
      uploadDate: '2023-05-15',
      author: {
        name: 'Jamie Foodie',
        avatar: '/foodie-avatar.jpg',
      },
      likes: 156,
      tags: ['event', 'food', 'culture'],
      category: 'event',
    },
    {
      id: '4',
      title: 'Morning in Central Park',
      url: '/city-park.jpg',
      description: 'Locals enjoying morning activities in the park',
      uploadDate: '2023-04-30',
      author: {
        name: 'Sam Walker',
        avatar: '/walker-avatar.jpg',
      },
      likes: 72,
      tags: ['nature', 'recreation'],
      category: 'landscape',
    },
    {
      id: '5',
      title: 'Historic District',
      url: '/historic-district.jpg',
      uploadDate: '2023-04-18',
      author: {
        name: 'History Buff',
        avatar: '/historian-avatar.jpg',
      },
      likes: 63,
      category: 'architecture',
    },
    {
      id: '6',
      title: 'City Marathon 2023',
      url: '/city-marathon.jpg',
      description: 'Participants crossing the finish line',
      uploadDate: '2023-03-05',
      author: {
        name: 'Sports Reporter',
        avatar: '/reporter-avatar.jpg',
      },
      likes: 210,
      tags: ['sports', 'event'],
      category: 'event',
    },
  ];
};

export default function GalleryTab() {
  const params = useParams();

  const { city } = useCity(params.city as string);

  const gallery = generateMockGallery();

  if (!city) return null;

  return (
    <div className='space-y-6'>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-bold'>{city.name} Gallery</h1>
          <p className='text-gray-400'>Explore photos from our community</p>
        </div>
        <div className='flex gap-3'>
          <Button variant='transparent' size='sm'>
            Map View
          </Button>
          <Button variant='primary' size='sm'>
            Upload Photo
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div className='flex flex-wrap gap-2'>
        <Button
          variant='transparent'
          size='sm'
          className='px-3 py-1 text-sm rounded-full bg-gray-800'
        >
          All Photos
        </Button>
        <Button
          variant='transparent'
          size='sm'
          className='px-3 py-1 text-sm rounded-full'
        >
          <Gallery className='w-4 h-4 mr-1 text-teal-400' />
          Landscapes
        </Button>
        <Button
          variant='transparent'
          size='sm'
          className='px-3 py-1 text-sm rounded-full'
        >
          <Map className='w-4 h-4 mr-1 text-blue-400' />
          Architecture
        </Button>
        <Button
          variant='transparent'
          size='sm'
          className='px-3 py-1 text-sm rounded-full'
        >
          <UsersGroupRounded className='w-4 h-4 mr-1 text-purple-400' />
          Events
        </Button>
      </div>

      {gallery.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {gallery.map(item => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className='group relative bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden'
            >
              {/* Image */}
              <div className='relative aspect-square'>
                <Image
                  src={item.url}
                  alt={item.title}
                  fill
                  className='object-cover'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
              </div>

              {/* Overlay Info */}
              <div className='absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity'>
                <div className='bg-gray-900/80 backdrop-blur-sm p-4 rounded-lg'>
                  <h3 className='font-semibold text-white'>{item.title}</h3>
                  {item.description && (
                    <p className='text-sm text-gray-300 mt-1'>
                      {item.description}
                    </p>
                  )}

                  <div className='flex items-center justify-between mt-3'>
                    <div className='flex items-center gap-2'>
                      <div className='relative w-6 h-6 rounded-full overflow-hidden border border-gray-600'>
                        <Image
                          src={item.author.avatar}
                          alt={item.author.name}
                          fill
                          className='object-cover'
                        />
                      </div>
                      <span className='text-xs text-gray-300'>
                        {item.author.name}
                      </span>
                    </div>

                    <div className='flex items-center gap-1 text-xs text-gray-400'>
                      <span>{item.likes}</span>
                      <svg className='w-4 h-4 fill-current' viewBox='0 0 20 20'>
                        <path d='M10 18.35l-1.45-1.32C3.4 12.36 0 9.28 0 5.5 0 2.42 2.42 0 5.5 0 7.24 0 8.91.81 10 2.09 11.09.81 12.76 0 14.5 0 17.58 0 20 2.42 20 5.5c0 3.78-3.4 6.86-8.55 11.54L10 18.35z' />
                      </svg>
                    </div>
                  </div>

                  {item.tags && item.tags.length > 0 && (
                    <div className='flex flex-wrap gap-1 mt-2'>
                      {item.tags.map(tag => (
                        <span
                          key={tag}
                          className='text-xs px-2 py-0.5 bg-gray-700 rounded-full text-gray-300'
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Always visible footer */}
              <div className='absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent'>
                <h3 className='text-sm font-medium text-white truncate'>
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className='text-center py-12'>
          <div className='mx-auto w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-4'>
            <Camera className='w-10 h-10 text-gray-600' />
          </div>
          <h3 className='text-xl font-medium mb-2'>Gallery is empty</h3>
          <p className='text-gray-400 max-w-md mx-auto'>
            No photos have been shared yet. Be the first to upload an image of{' '}
            {city.name}!
          </p>
          <Button className='mt-4' variant='primary'>
            Upload Photo
          </Button>
        </div>
      )}
    </div>
  );
}
