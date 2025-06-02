'use client';

import { useEffect, useState } from 'react';
import { CityCard } from '@/components/city-card';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter, useSearchParams } from 'next/navigation';
import { CityFilters } from '@/components/city-filters';
import { useCities } from '@/hooks/api/city/useCities';
import { useTags } from '@/hooks/api/tag/useTags';

export default function Cities() {
  const [isAltPressed, setIsAltPressed] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const router = useRouter();

  const searchParams = useSearchParams();
  const [tags, setTags] = useState(searchParams.get('tags')?.split(',') ?? []);
  const cityName = searchParams.get('name') ?? '';

  const [filters, setFilters] = useState({
    cityName: '',
    sortBy: '',
    tags,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Alt') {
        setIsAltPressed(true);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Alt') {
        if (!selectedTags?.length) return;
        const uniqueTags = Array.from(new Set(selectedTags));
        router.push(`/cities?tags=${uniqueTags.join(',')}`);
        setIsAltPressed(false);
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

  const { cities, isLoading } = useCities(cityName, tags);

  const { popularTags } = useTags({ popular: true });

  const handleTagClick = (e: MouseEvent, tagName: string) => {
    e.stopPropagation();
    e.preventDefault();
    if (isAltPressed) {
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
        filters={filters}
        setFilters={setFilters}
        availableRegions={['123', '456']}
        availableTags={popularTags?.map(tag => tag?.name)}
        setTags={tags => {
          setTags(tags.length ? tags : []);
          router.push(
            tags.length ? `/cities?tags=${tags.join(',')}` : `/cities`
          );
        }}
        tags={tags}
      />
      <ul className='grid justify-center grid-cols-1 lg:grid-cols-[repeat(3,_minmax(0,_448px))] sm:grid-cols-[repeat(2,_minmax(0,_448px))] xl:grid-cols-[repeat(4,_minmax(0,_448px))] 2xl:grid-cols-[repeat(5,_minmax(0,_448px))]  gap-4'>
        {isLoading
          ? array.map(i => (
              <li key={i}>{<Skeleton width={'100%'} height={240} />}</li>
            ))
          : cities?.map(city => (
              <li key={city.id} className='z-1'>
                <CityCard
                  city={city}
                  onClick={handleTagClick}
                  selectedTags={isAltPressed || isLoading ? selectedTags : tags}
                />
              </li>
            ))}
      </ul>
    </div>
  );
}
