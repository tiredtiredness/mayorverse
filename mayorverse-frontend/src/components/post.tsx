import { IPost } from '@/types';
import { motion } from 'framer-motion';
import { Button, Skeleton } from './ui';
import Image from 'next/image';
import { Calendar } from '@solar-icons/react';

export function Post({
  post,
  isLoading,
  index,
}: {
  post: IPost;
  isLoading: boolean;
  index: number;
}) {
  return (
    <motion.article
      key={post.id}
      initial={{ opacity: 0, y: 20, scale: 1 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className='border border-gray-700 rounded-xl shadow-lg '
    >
      {post?.imageUrl && (
        <div className='relative h-48 w-full '>
          <Image
            src={post?.imageUrl}
            alt={post?.name}
            fill
            className='object-cover'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent' />
        </div>
      )}

      <div className='p-5 space-y-4'>
        <div className='flex items-center gap-2 flex-wrap'>
          {post.tags?.map(tag => (
            <span
              key={tag.id}
              className='text-xs px-2 py-1 bg-gray-700 rounded-full text-gray-300'
            >
              {tag.name}
            </span>
          ))}
        </div>
        {isLoading ? (
          <Skeleton width={'100%'} height={20} />
        ) : (
          <h2 className='text-xl font-semibold text-white'>{post?.name}</h2>
        )}
        {isLoading ? (
          <Skeleton width={'100%'} height={20} />
        ) : (
          <p className='text-gray-300'>{post?.content}</p>
        )}

        <div className='flex items-center justify-between pt-2'>
          <div className='flex items-center gap-3'>
            <div className='relative w-8 h-8 rounded-full overflow-hidden border border-gray-600'>
              {post?.userId && (
                <Image
                  src={post.user.avatarUrl ?? ''}
                  alt={post.user.username}
                  fill
                  className='object-cover'
                />
              )}
            </div>
            <div>
              <p className='text-sm font-medium'>{post?.user?.username}</p>
            </div>
          </div>

          <div className='flex items-center gap-2 text-sm text-gray-400'>
            <Calendar className='w-4 h-4' />
            <span>
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>

        <Button variant='secondary' size='sm' className='mt-3 group'>
          Read Full Story
        </Button>
      </div>
    </motion.article>
  );
}
