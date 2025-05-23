import { ICity } from '@/types/city.types';
import { UsersGroupRounded } from '@solar-icons/react';
import Image from 'next/image';
import Link from 'next/link';
import { Tag } from './ui';

export function CityCard({
  city,
  onClick,
  selectedTags,
}: {
  city: ICity;
  onClick?: (e: MouseEvent, tagName: string) => void;
  selectedTags?: string[];
}) {
  return (
    <Link
      href={`/cities/${city.id}`}
      className=' group focus:ring-0  '
      aria-label={`Visit ${city.name} city page`}
    >
      <div
        className='relative group-focus:focusable group-focus:ring-0 
                text-white placeholder-gray-400  h-60 max-w-md rounded-lg overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:shadow-teal-900/50  group-hover:ring-2 group-hover:ring-teal-600/80
      transform'
      >
        {city?.avatarUrl && (
          <Image
            src={city?.avatarUrl ?? '/images/cities/demoPic.jpeg'}
            alt={`${city?.name} city cover`}
            fill
            className='object-cover transition-transform duration-500 '
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            priority={false}
          />
        )}

        <div className='absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent' />

        <div className='absolute top-3 right-3 flex items-center gap-1 text-white bg-gray-900/80 backdrop-blur-sm px-2.5 py-1 rounded-full text-sm font-medium shadow-lg'>
          <span>{city?._count?.follows}</span>
          <UsersGroupRounded className='h-3.5 w-3.5' />
        </div>

        <div className='absolute bottom-0 w-full px-4 pb-3 pt-6 space-y-1'>
          <h3 className='text-2xl font-bold text-white drop-shadow-lg line-clamp-1'>
            {city?.name}
          </h3>

          <div className='flex justify-between items-end'>
            <div className='text-sm text-gray-300 drop-shadow-md space-y-0.5'>
              <p className='line-clamp-1'>Mayor: {city?.mayor?.username}</p>
              <p>Founded: {new Date(city?.createdAt).getFullYear()}</p>
            </div>
          </div>
          <ul className='flex gap-1 whitespace-nowrap text-ellipsis max-w-full '>
            {city?.tags?.map(tag => (
              <li key={tag.id}>
                <Tag
                  tag={tag}
                  onClick={onClick}
                  isSelected={selectedTags?.includes(tag.name)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  );
}
