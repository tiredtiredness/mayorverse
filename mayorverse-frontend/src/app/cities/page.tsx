'use client';

import { MouseEvent, useEffect, useState } from 'react';
import { CityCard } from '@/components/city-card';
import { useQuery } from '@tanstack/react-query';
import { cityService } from '@/services/city.service';
import { Skeleton } from '@/components/ui/skeleton';
import { ICity } from '@/types/city.types';
import { useRouter } from 'next/navigation';
import { CityFilters } from '@/components/city-filters';
import { tagService } from '@/services';
import { ITag } from '@/types';

export default function Cities() {
  const [isShiftPressed, setIsShiftPressed] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const router = useRouter();

  const [initialTags, setInitialTags] = useState<string[]>([]);
  const [initialName, setInitialName] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setInitialTags(params.get('tags')?.split(',') ?? []);
    setInitialName(params.get('name') ?? '');
  }, []);

  const [filters, setFilters] = useState({
    search: '',
    population: '',
    sortBy: '',
  });

  console.log(filters);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        setIsShiftPressed(true);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        const uniqueTags = Array.from(new Set(selectedTags));
        router.push(`/cities?tags=${uniqueTags.join(',')}`);
        setIsShiftPressed(false);
        setSelectedTags([]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [selectedTags, router]);

  const { data: cities, isLoading } = useQuery<ICity[]>({
    queryKey: ['cities', { tags: initialTags }],
    queryFn: () =>
      cityService.getCities({ name: initialName, tags: initialTags }),
  });

  const { data: popularTags } = useQuery({
    queryKey: ['popularTags'],
    queryFn: async () => {
      return await tagService.getCityTags({ popular: true });
    },
  });

  const handleTagClick = (
    e: MouseEvent<HTMLButtonElement>,
    tagName: string
  ) => {
    e.stopPropagation();
    e.preventDefault();
    if (isShiftPressed) {
      setSelectedTags(prev => [...prev, tagName]);
    } else {
      router.push(`/cities?tags=${tagName}`);
    }
  };

  const array = Array.from({ length: 15 }).map((_, i) => i);

  return (
    <div className='p-4 min-h-[calc(100dvh_-_48px_-_66px)]'>
      <CityFilters
        onFilterChange={setFilters}
        availableRegions={['123', '456']}
        availableTags={popularTags?.map((tag: ITag) => tag?.name)}
      />
      <ul className='grid justify-center grid-cols-1 lg:grid-cols-[repeat(3,_minmax(0,_448px))] sm:grid-cols-[repeat(2,_minmax(0,_448px))] xl:grid-cols-[repeat(4,_minmax(0,_448px))] 2xl:grid-cols-[repeat(5,_minmax(0,_448px))]  gap-4'>
        {isLoading
          ? array.map(i => (
              <li key={i}>{<Skeleton width={'100%'} height={240} />}</li>
            ))
          : cities?.map(city => (
              <li key={city.id}>
                <CityCard
                  city={city}
                  onClick={handleTagClick}
                  selectedTags={selectedTags}
                />
              </li>
            ))}
      </ul>
    </div>
  );
}
