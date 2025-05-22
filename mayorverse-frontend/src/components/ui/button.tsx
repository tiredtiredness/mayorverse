import Link from 'next/link';
import { ButtonHTMLAttributes } from 'react';

const buttonVariants = {
  primary:
    'bg-teal-600 text-white hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-900/50',
  secondary:
    'border border-teal-600 text-teal-500 focus:border hover:bg-teal-700 hover:text-white hover:border-teal-700 hover:shadow-lg hover:shadow-teal-900/50',
  transparent:
    'border border-transparent text-teal-500 focus:border hover:bg-teal-700 hover:text-white hover:border-teal-700 hover:shadow-lg hover:shadow-teal-900/50',
  link: 'focusable p-1 rounded text-white',
};

const buttonSizes = {
  sm: 'px-2 py-1 text-sm rounded-sm',
  md: 'px-2 py-1 text-md rounded-md',
  lg: 'px-6 py-3 text-lg rounded-lg ',
};

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  href?: string;
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  isLoading = false,
  disabled = false,
  className,
  ...props
}: IButton) {
  return href ? (
    <Link href={href}>
      <div
        className={`${buttonVariants[variant]} ${buttonSizes[size]} ${
          disabled && 'opacity-50 cursor-not-allowed'
        } hover:cursor-pointer ${
          isLoading && 'brightness-90'
        } ${className} focusable transition-colors duration-300`}
      >
        {children}
      </div>
    </Link>
  ) : (
    <button
      className={`${buttonVariants[variant]} ${
        buttonSizes[size]
      }  hover:cursor-pointer active:bg-teal-800 ${
        isLoading && 'brightness-90'
      } ${
        disabled && 'opacity-50 cursor-not-allowed'
      } ${className} focusable transition-all duration-300`}
      {...props}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
