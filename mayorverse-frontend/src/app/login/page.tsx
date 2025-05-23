'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { authService } from '@/services/auth.service';
import { ILoginForm } from '@/types/auth.types';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Danger, Lock, User } from '@solar-icons/react';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const { register, formState, handleSubmit, reset } = useForm<ILoginForm>();

  const { push } = useRouter();

  const { mutate, isPending: isLoading } = useMutation({
    mutationKey: ['user', 'profile'],
    mutationFn: (formData: ILoginForm) => authService.login(formData),
    onSuccess() {
      reset();
      push('/profile');
    },
    onError(error) {
      setError(error.message);
    },
  });

  const onSubmit: SubmitHandler<ILoginForm> = data => {
    mutate(data);
  };

  return (
    <div className='min-h-[calc(100dvh_-_48px_-_66px)] flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-white mb-2'>Welcome back</h1>
          <p className='text-gray-400'>Sign in to your account to continue</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='bg-gray-800/60 w-md backdrop-blur-sm border border-gray-700 rounded-xl p-8 shadow-lg'
        >
          {error && (
            <div className='mb-4 p-3 bg-red-900/30 border border-red-700 rounded-lg flex items-center gap-2 text-red-300'>
              <Danger className='h-5 w-5' />
              <span>{error}</span>
            </div>
          )}

          <div className='space-y-5'>
            <Input
              label='Username'
              icon={<User className='h-5 w-5 text-gray-500' />}
              error={formState.errors.username?.message?.toString()}
              {...register('username', {
                required: 'This field is required',
              })}
              placeholder='citybuilder85'
              autoComplete='username'
            />

            <Input
              label='Password'
              type={showPassword ? 'text' : 'password'}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              icon={<Lock className='h-5 w-5 text-gray-500' />}
              error={formState.errors.password?.message?.toString()}
              {...register('password', { required: 'This field is required' })}
              placeholder='••••••••'
              autoComplete='current-password'
            />

            {/* <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <input
                  id='remember-me'
                  name='remember-me'
                  type='checkbox'
                  className='h-4 w-4 rounded border-gray-600 text-teal-500 focus:ring-teal-500 bg-gray-700'
                />
                <label
                  htmlFor='remember-me'
                  className='ml-2 block text-sm text-gray-300'
                >
                  Remember me
                </label>
              </div>

              <div className='text-sm'>
                <Link
                  href='/forgot-password'
                  className='font-medium text-teal-400 hover:text-teal-300'
                >
                  Forgot password?
                </Link>
              </div>
            </div> */}

            <Button
              type='submit'
              variant='primary'
              size='lg'
              className='w-full mt-2'
              isLoading={isLoading}
              disabled={!formState.isDirty || !formState.isValid}
            >
              Sign in
            </Button>
          </div>

          {/* <div className='mt-6'>
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-gray-700' />
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-2 bg-gray-800 text-gray-400'>
                  Or continue with
                </span>
              </div>
            </div>

            <div className='mt-6 flex justify-center gap-3'>
              <Button
                type='button'
                variant='outline'
                className='flex items-center justify-center gap-2'
              >
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0110 4.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z' />
                </svg>
                <span>Google</span>
              </Button>
            </div>
          </div> */}

          <p className='mt-6 text-center text-sm text-gray-400'>
            Don&apos;t have an account?{' '}
            <Link
              href='/sign-up'
              className='font-medium text-teal-400 hover:text-teal-300'
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
