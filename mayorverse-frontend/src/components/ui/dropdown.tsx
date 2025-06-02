'use client';

import { useState } from 'react';

export function Dropdown({
  options,
  isMultiple = false,
  value,
  setValue,
  isOpen,
  setIsOpen,
  ref,
}: {
  options: string[];
  isMultiple?: boolean;
  value: string;
  setValue: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  return (
    <div ref={ref}>
      <button
        className='w-full pl-10 pr-3 py-2 rounded-lg bg-gray-700 border
        border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500
        focus:border-transparent transition-all duration-200 text-white text-left
        appearance-none z-10'
        onClick={() => setIsOpen(!isOpen)}
      >
        {value}
      </button>
      {isOpen && (
        <div className='absolute w-full z-10 bg-gray-800 p-2 rounded-lg mt-2 flex flex-col gap-2 border border-gray-600'>
          {options.map(option => (
            <button
              className='w-full px-2 py-1 bg-gray-700 rounded-lg border
        border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500
        focus:border-transparent transition-all duration-200 text-white
        appearance-none'
              key={option}
              onClick={() => {
                setIsOpen(false);
                setValue(prev => ({ ...prev, sortBy: option }));
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
