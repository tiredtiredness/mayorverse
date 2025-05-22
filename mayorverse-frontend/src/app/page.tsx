'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { City } from '@solar-icons/react';

export default function Home() {
  const router = useRouter();

  return (
    <div className='relative overflow-hidden'>
      {/* Hero Section */}
      <div className='min-h-screen flex flex-col items-center justify-center text-center px-4 relative'>
        {/* Background Elements */}
        <div className='absolute inset-0 -z-20'>
          <div className='absolute inset-0 bg-[url(/images/cities/demoPic.jpeg)] bg-no-repeat bg-cover bg-center opacity-20' />
          <div className='absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/20 to-gray-900' />
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(16,_185,_129,_0.1)_0,_transparent_70%)]' />
        </div>

        <div className='absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(ellipse_at_center,_black_50%,_transparent_70%)]'>
          <div className='absolute inset-0 bg-[url(/images/grid.svg)] bg-[center_top_1px] bg-repeat' />
        </div>

        <div className='absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-teal-400 blur-sm'></div>
        <div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0], y: [-10, 10, -10] }}
          transition={{ duration: 5, repeat: Infinity, repeatDelay: 1 }}
          className='absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-teal-500 blur-sm'
        ></div>

        <div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='max-w-4xl mx-auto'
        >
          <div className='mb-6 flex justify-center'>
            <div className='px-4 py-1.5 rounded-full bg-teal-900/30 border border-teal-400/30 text-teal-300 text-sm flex items-center gap-2'>
              <City weight='Outline' className='w-4 h-4' />
              <span>Build your virtual metropolis</span>
            </div>
          </div>

          <h1 className='text-5xl md:text-7xl font-bold mb-6 text-white'>
            <span className='bg-gradient-to-r from-teal-300 to-emerald-400 bg-clip-text text-transparent'>
              MayorVerse
            </span>
          </h1>

          <p className='text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed'>
            Shape the future of virtual cities. Vote, create, and govern in a
            <span className='text-teal-300 font-medium'>
              {' '}
              player-driven universe
            </span>{' '}
            where every decision matters.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button
              onClick={() => router.push('/cities')}
              variant='primary'
              size='lg'
            >
              Explore Cities
            </Button>
            <Button
              onClick={() => router.push('/create-city')}
              variant='secondary'
              size='lg'
            >
              Found Your City
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
