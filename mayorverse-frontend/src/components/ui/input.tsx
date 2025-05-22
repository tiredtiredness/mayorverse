import { Eye, EyeClosed } from '@solar-icons/react';
import { InputHTMLAttributes, JSX } from 'react';

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: JSX.Element;
  error?: string;
  type?: 'text' | 'password' | 'email' | 'number';
  showPassword?: boolean;
  setShowPassword?: (value: boolean) => void;
  placeholder?: string;
}

export function Input({
  label,
  icon,
  error = '',
  type = 'text',
  showPassword = undefined,
  setShowPassword,
  placeholder,
  ...props
}: IInput) {
  return (
    <div>
      <label
        htmlFor='username'
        className='block text-sm font-medium text-gray-300 mb-1'
      >
        {label}
      </label>
      <div className='relative'>
        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
          {icon}
        </div>
        <input
          type={type}
          {...props}
          placeholder={placeholder}
          className={`w-full ${
            icon ? 'pl-10' : 'pl-3'
          } pr-3 py-2.5 bg-gray-700 border ${
            error ? 'border-red-500' : 'border-gray-600'
          } rounded-lg 
                  focusable focus:border-transparent
                  text-white placeholder-gray-400 transition-all duration-200`}
        />
        {showPassword !== undefined && (
          <button
            type='button'
            className='absolute inset-y-0 right-0 pr-3 flex items-center'
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeClosed className='h-5 w-5 text-gray-400 hover:text-gray-300' />
            ) : (
              <Eye className='h-5 w-5 text-gray-400 hover:text-gray-300' />
            )}
          </button>
        )}
      </div>
      {error && <p className='mt-1 text-sm text-red-400'>{error}</p>}
    </div>
  );
}
