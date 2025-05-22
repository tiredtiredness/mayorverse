'use client';

import Image from 'next/image';
import Link from 'next/link';
import { authService } from '@/services/auth.service';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from './ui/button';

export function Header() {
  const path = usePathname();
  const { isAuthenticated, isLoading } = useAuth();
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleLogoutClick = async () => {
    try {
      router.push('/');
      await authService.logout();
      await queryClient.invalidateQueries({ queryKey: ['profile'] });
    } catch (error) {
      alert('Ошибка при выходе из системы.');
    }
  };

  return (
    <header className='flex items-center justify-center gap-8 py-2'>
      <Link href='/' className='text-white p-1 focusable rounded '>
        MayorVerse
      </Link>
      <Image src='/logo.svg' alt='logo' width={50} height={50} />
      <nav>
        <ul className='flex gap-4 items-center'>
          <li key={'Cities'}>
            <Link
              href={'/cities'}
              className={`focusable p-1 rounded ${
                path.includes('/cities') ? 'text-teal-300' : 'text-white'
              }`}
            >
              Cities
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              <li key={'Profile'}>
                <Link
                  href={'/profile'}
                  className={`focusable p-1 rounded ${
                    path.includes('/profile') ? 'text-teal-300' : 'text-white'
                  }`}
                >
                  Profile
                </Link>
              </li>
              <li key={'Logout'}>
                <Button variant='link' onClick={handleLogoutClick}>
                  Logout
                </Button>
              </li>
            </>
          ) : (
            <>
              <li key={'Login'}>
                <Link
                  href={'/login'}
                  className={`focusable p-1 rounded ${
                    path.includes('/login') ? 'text-teal-300' : 'text-white'
                  }`}
                >
                  Login
                </Link>
              </li>
              <li key={'Sign Up'}>
                <Link
                  href={'/sign-up'}
                  className={`focusable p-1 rounded ${
                    path.includes('/sign-up') ? 'text-teal-300' : 'text-white'
                  }`}
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
