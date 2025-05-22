'use client';

import { useEffect } from 'react';
import { CloseCircle } from '@solar-icons/react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnBackdropClick?: boolean;
};

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  closeOnBackdropClick = true,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnBackdropClick) {
      onClose();
    }
  };

  return (
    <div
      className='fixed text-white h-dvh w-dvw overflow-y-auto p-4 inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur-sm'
      onClick={handleBackdropClick}
    >
      <div
        className={`w-full ${sizeClasses[size]} bg-gray-800 rounded-xl border border-gray-700 shadow-xl  animate-fade-in`}
      >
        {title && (
          <div className='flex items-center justify-between p-4 border-b border-gray-700'>
            <h3 className='text-xl font-semibold'>{title}</h3>
            <button
              onClick={onClose}
              className='focusable m-1 rounded-full hover:bg-gray-700 transition-colors hover:cursor-pointer'
              aria-label='Close'
            >
              <CloseCircle className='w-5 h-5' />
            </button>
          </div>
        )}
        <div className='p-4 overflow-y-scroll'>{children}</div>
      </div>
    </div>
  );
}
