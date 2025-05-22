'use client';

import { CityCard } from '@/components/city-card';
import { Skeleton } from '@/components/ui/skeleton';
import { authService } from '@/services/auth.service';
import { IUser } from '@/types/auth.types';
import { HeartAngle } from '@solar-icons/react';
import { useQuery } from '@tanstack/react-query';

export default function FavoritesPage() {
  const { data: user, isLoading } = useQuery<IUser>({
    queryKey: ['user', 'profile'],
    queryFn: () => authService.getProfile(),
  });

  const array = Array.from({ length: 12 }).map((_, i) => i);

  return (
    <ul className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
      {isLoading ? (
        array.map(item => (
          <li key={item}>
            <Skeleton width={'100%'} height={240} />
          </li>
        ))
      ) : (
        <>
          {user?.follows ? (
            user?.follows?.map(item => (
              <li key={item.city.id}>
                <CityCard city={item.city} key={item.city.id} />
              </li>
            ))
          ) : (
            <div className='col-span-full text-center py-12'>
              <div className='mx-auto w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-4'>
                <HeartAngle className='w-10 h-10 text-gray-600' />
              </div>
              <h3 className='text-xl font-medium mb-2'>
                No favorite cities yet
              </h3>
              <p className='text-gray-400 max-w-md mx-auto'>
                Cities you mark as favorite will appear here. Start exploring to
                find cities you love!
              </p>
            </div>
          )}
        </>
      )}
    </ul>
  );
}
