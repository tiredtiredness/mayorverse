'use client';

import { CityCard } from '@/components/city-card';
import { Button } from '@/components/ui/button';
import { authService } from '@/services/auth.service';
import { IUser } from '@/types/auth.types';
import { CupStar } from '@solar-icons/react';
import { useQuery } from '@tanstack/react-query';

export default function CitiesPage() {
  const { data: user } = useQuery<IUser>({
    queryKey: ['user', 'profile'],
    queryFn: () => authService.getProfile(),
  });
  return (
    <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
      {user?.cities ? (
        user?.cities?.map(city => <CityCard city={city} key={city.id} />)
      ) : (
        <div className='col-span-full text-center py-12'>
          <div className='mx-auto w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-4'>
            <CupStar className='w-10 h-10 text-gray-600' />
          </div>
          <h3 className='text-xl font-medium mb-2'>Not a mayor yet</h3>
          <p className='text-gray-400 max-w-md mx-auto'>
            You haven&apos;t founded or been elected mayor of any cities. Create
            your first city to get started!
          </p>
          <Button href='/create-city' className='mt-4' variant='primary'>
            Create City
          </Button>
        </div>
      )}
    </div>
  );
}
