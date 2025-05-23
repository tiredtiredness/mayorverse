'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { authService } from '@/services/auth.service';
import { IRegisterForm } from '@/types/auth.types';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { Danger, Letter, Lock, User } from '@solar-icons/react';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register, formState, handleSubmit, watch, reset } =
    useForm<IRegisterForm>();

  const { push } = useRouter();

  const { mutate } = useMutation({
    mutationKey: ['user', 'profile'],
    mutationFn: (formData: IRegisterForm) => authService.register(formData),
    onSuccess() {
      reset();
      push('/profile');
    },
  });

  const onSubmit = (data: IRegisterForm) => {
    mutate(data);
  };

  return (
    <div className='min-h-[calc(100dvh_-_48px_-_66px)] flex items-center justify-center p-4 '>
      <div className='w-full max-w-md'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-white mb-2'>
            Create your account
          </h1>
          <p className='text-gray-400'>Join our community of city builders</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-xl p-8 shadow-lg'
        >
          {formState.errors.root?.message && (
            <div className='mb-4 p-3 bg-red-900/30 border border-red-700 rounded-lg flex items-center gap-2 text-red-300'>
              <Danger className='h-5 w-5' />
              <span>{formState.errors.root?.message}</span>
            </div>
          )}

          <div className='space-y-4'>
            <Input
              label='Username'
              icon={<User className='h-5 w-5 text-gray-500' />}
              error={formState.errors.username?.message?.toString()}
              {...register('username', {
                required: 'This field is required',
                pattern: {
                  value: /[a-zA-Z\d]/,
                  message: 'Username should be between 4 and 25 chars long',
                },
              })}
              placeholder='citybuilder85'
              autoComplete='username'
            />

            <Input
              type='email'
              label='Email address'
              icon={<Letter className='h-5 w-5 text-gray-500' />}
              error={formState.errors.email?.message?.toString()}
              {...register('email', { required: 'This field is required' })}
              placeholder='you@example.com'
              autoComplete='email'
            />

            <Input
              label='Password'
              type={showPassword ? 'text' : 'password'}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              icon={<Lock className='h-5 w-5 text-gray-500' />}
              error={formState.errors.password?.message?.toString()}
              {...register('password', { required: 'This field is required' })}
              placeholder='password'
              autoComplete='new-password'
            />

            <Input
              label='Confirm Password'
              type={showConfirmPassword ? 'text' : 'password'}
              showPassword={showConfirmPassword}
              setShowPassword={setShowConfirmPassword}
              icon={<Lock className='h-5 w-5 text-gray-500' />}
              error={formState.errors.confirmPassword?.message?.toString()}
              {...register('confirmPassword', {
                required: 'This field is required',
                validate: (val: string) => {
                  if (val !== watch('password')) {
                    return 'Passwords do not match!';
                  }
                },
              })}
              placeholder='password again'
              autoComplete='new-password'
            />

            <div className='flex items-center'>
              <input
                type='checkbox'
                {...register('terms', {
                  required: 'You have to agree with terms & policy',
                })}
                className='h-4 w-4 rounded border-gray-600 text-teal-500 focus:ring-teal-500 bg-gray-700'
              />
              <label
                htmlFor='terms'
                className='ml-2 block text-sm text-gray-300'
              >
                I agree to the{' '}
                <Link
                  href='/terms'
                  className='text-teal-400 hover:text-teal-300'
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link
                  href='/privacy'
                  className='text-teal-400 hover:text-teal-300'
                >
                  Privacy Policy
                </Link>
              </label>
            </div>
            {formState.errors.terms && (
              <p className='mt-1 text-sm text-red-400'>
                {formState.errors.terms.message?.toString()}
              </p>
            )}

            <Button
              type='submit'
              variant='primary'
              size='lg'
              className='w-full mt-4'
              isLoading={formState.isLoading}
              disabled={false}
            >
              Create Account
            </Button>
          </div>

          {/* <div className='mt-6'>
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-gray-700' />
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-2 bg-gray-800 text-gray-400'>
                  Or sign up with
                </span>
              </div>
            </div>

            <div className='mt-6 flex justify-center gap-3'>
              <Button
                type='button'
                variant='outline'
                className='flex items-center justify-center gap-2 text-white fill-white stroke-white'
              >
                <Image
                  src={'/google-logo.svg'}
                  width={20}
                  height={20}
                  alt='google logo'
                />
                <span>Google</span>
              </Button>
            </div>
          </div> */}

          <p className='mt-6 text-center text-sm text-gray-400'>
            Already have an account?{' '}
            <Link
              href='/login'
              className='font-medium text-teal-400 hover:text-teal-300'
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
