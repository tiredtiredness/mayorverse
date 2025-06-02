'use client';

import { ArrowUp, CloseCircle, Magnifer } from '@solar-icons/react';
import { useRef, useState } from 'react';
import { Dropdown, Tag } from './ui';
import { useClickOutside } from '@/hooks';

export type CityFiltersProps = {
  onFilterChange: (filters: {
    search: string;
    population: string;
    sortBy: string;
    tags: string[];
    region: string;
    activity: string;
    setTags: () => void;
  }) => void;
  initialFilters?: {
    search?: string;
    population?: string;
    sortBy?: string;
    region?: string;
    activity?: string;
  };
  filters: Record<string, string | string[]>;
  setFilters: (filters: Record<string, string>) => void;
  availableTags: string[];
  availableRegions: string[];
  tags: string[];
  setTags: (any) => void;
};

export function CityFilters({
  onFilterChange,
  filters,
  setFilters,
  availableTags = ['historic', 'modern'],
  tags,
  setTags,
}: CityFiltersProps) {
  const [showTagSelector, setShowTagSelector] = useState(false);

  const hasActiveFilters = Object.values(filters).some(val =>
    Array.isArray(val) ? val?.length > 0 : val !== ''
  );

  const sortRef = useRef(null);

  useClickOutside(sortRef, () => setIsOpenSortDropdown(false));

  const [isOpenSortDropdown, setIsOpenSortDropdown] = useState(false);

  return (
    <div className='bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-xl p-4 mb-6 shadow-lg'>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {/* Search Field */}
        <div className='relative'>
          <label
            htmlFor='search'
            className='block text-sm font-medium mb-1 text-gray-300'
          >
            Search
          </label>
          <div className='relative'>
            <Magnifer className='h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
            <input
              id='search'
              type='text'
              className='w-full pl-10 pr-8 py-2 rounded-lg bg-gray-700 border border-gray-600 
                        focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
                        transition-all duration-200 text-white placeholder-gray-400'
              value={filters.search}
              onChange={e => setFilters({ ...filters, search: e.target.value })}
              placeholder='City, mayor or tag...'
            />
            {filters.search && (
              <button
                onClick={() => setFilters({ ...filters, search: '' })}
                className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white'
                aria-label='Clear search'
              >
                <CloseCircle className='h-5 w-5' />
              </button>
            )}
          </div>
        </div>

        {/* Sort By */}
        <div>
          <label
            htmlFor='sortBy'
            className='block text-sm font-medium mb-1 text-gray-300'
          >
            Sort by
          </label>
          <div className='relative'>
            <ArrowUp className='h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none' />
            <Dropdown
              options={['Popular', 'Residents', 'Newest', 'Oldest']}
              isMultiple={false}
              value={filters?.sortBy || 'Default'}
              setValue={onFilterChange}
              isOpen={isOpenSortDropdown}
              setIsOpen={setIsOpenSortDropdown}
              ref={sortRef}
            />
            {/* <select
              id='sortBy'
              className='w-full pl-10 pr-3 py-2 rounded-lg bg-gray-700 border border-gray-600 
                        focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
                        transition-all duration-200 text-white appearance-none'
              value={filters.sortBy}
              onChange={e => setFilters({ ...filters, sortBy: e.target.value })}
            >
              <option value=''>Default</option>
              <option value='popular'>Most popular</option>
              <option value='recent'>Recently updated</option>
              <option value='newest'>Newest first</option>
              <option value='oldest'>Oldest first</option>
              <option value='polls'>Most polls</option>
              <option value='residents'>Most residents</option>
            </select> */}
          </div>
        </div>

        {/* Tags Filter */}
        <div className='relative'>
          <label className='block text-sm font-medium mb-1 text-gray-300'>
            Tags
          </label>
          <button
            type='button'
            onClick={() => setShowTagSelector(!showTagSelector)}
            className={`w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 
                      flex items-center justify-between transition-all duration-200
                      ${
                        filters?.tags?.length > 0
                          ? 'text-teal-400'
                          : 'text-white'
                      }`}
          >
            <div className='flex items-center gap-2 '>
              <span>
                {filters?.tags?.length > 0
                  ? `${filters?.tags?.length} selected`
                  : 'Select tags...'}
              </span>
            </div>
            <span className='text-xs bg-gray-600 rounded-full px-2 py-0.5'>
              {filters?.tags?.length}
            </span>
          </button>

          {showTagSelector && (
            <div className='absolute mt-1 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-2 max-h-60 overflow-y-auto'>
              <div className='grid grid-cols-2 gap-2'>
                {availableTags.map(tag => (
                  <label
                    key={tag}
                    className='flex items-center gap-2 text-sm cursor-pointer'
                  >
                    <input
                      type='checkbox'
                      checked={filters?.tags?.includes(tag)}
                      className='rounded border-gray-600 text-teal-500 focus:ring-teal-500'
                    />
                    <span className='capitalize'>{tag}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Reset Button */}
        <div className='flex items-end'>
          <button
            disabled={!hasActiveFilters}
            className={`w-full py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2
                      ${
                        hasActiveFilters
                          ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-md hover:shadow-teal-500/20'
                          : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      }`}
          >
            <CloseCircle className='h-5 w-5' />
            Reset filters
          </button>
        </div>
      </div>

      {/* Active filters indicator */}
      {hasActiveFilters && (
        <div className='mt-3 flex flex-wrap gap-2'>
          {filters.search && (
            <span className='text-xs px-2 py-1 bg-gray-700 rounded-full flex items-center gap-1'>
              Search: &#34;{filters.search}&#34;
              <button onClick={() => setFilters({ ...filters, search: '' })}>
                <CloseCircle className='h-3 w-3' />
              </button>
            </span>
          )}
          {filters.population && (
            <span className='text-xs px-2 py-1 bg-gray-700 rounded-full flex items-center gap-1'>
              {
                {
                  tiny: 'Tiny cities',
                  small: 'Small cities',
                  medium: 'Medium cities',
                  large: 'Large cities',
                  huge: 'Huge cities',
                }[filters.population]
              }
              <button
                onClick={() => setFilters({ ...filters, population: '' })}
              >
                <CloseCircle className='h-3 w-3' />
              </button>
            </span>
          )}
          {filters.region && (
            <span className='text-xs px-2 py-1 bg-gray-700 rounded-full flex items-center gap-1'>
              Region: {filters.region}
              <button onClick={() => setFilters({ ...filters, region: '' })}>
                <CloseCircle className='h-3 w-3' />
              </button>
            </span>
          )}
          {filters.tags?.length > 0 && (
            <ul>
              {filters?.tags?.map(tag => (
                <li key={tag}>
                  <Tag
                    tag={{ name: tag }}
                    onDelete={() => {
                      console.log(
                        tag,
                        tags?.filter(item => item !== tag)
                      );
                      setTags(tags?.filter(item => item !== tag));
                    }}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
