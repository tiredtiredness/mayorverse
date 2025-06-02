'use client';

import { useForm } from 'react-hook-form';
import { Button, Input, Modal, Textarea } from './ui';
import { IPoll } from '@/types';
import { Checkbox } from './ui/checkbox';
import { useCreatePoll } from '@/hooks/api/poll/useCreatePoll';
import { useState } from 'react';
import { CheckSquare, Pen, TrashBinMinimalistic } from '@solar-icons/react';
import { useQueryClient } from '@tanstack/react-query';

export function CreatePollModal({
  isOpen,
  onClose,
  cityId,
}: {
  isOpen: boolean;
  onClose: () => void;
  cityId: string;
}) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<IPoll>();
  const [pollOptions, setPollOptions] = useState<string[]>([]);
  const [optionName, setOptionName] = useState<string>('');
  const onSubmit = (formData: IPoll) => {
    createPoll({ formData, options: pollOptions });
  };
  const onReset = () => {
    reset();
    queryClient.invalidateQueries({ queryKey: ['polls', cityId] });
    onClose();
  };

  const { createPoll } = useCreatePoll({
    postId: 'cmajl0rt6000044rvxy0r2zhu',
    cityId,
    onSuccess: onReset,
  });

  return (
    <Modal title='Create Poll' isOpen={isOpen} onClose={onClose}>
      <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
        <Input label='Title' {...register('name')} />
        <Textarea label='Description' rows={3} {...register('description')} />

        <Input
          type='datetime-local'
          label='End date'
          min={new Date().toISOString()}
          {...register('endDate', {
            valueAsDate: true,
            min: { value: new Date().toISOString(), message: '' },
          })}
        />

        <label className='text-sm font-medium text-white mb-1 flex items-center justify-between '>
          Multiple choices
          <Checkbox {...register('isMultiple')} />
        </label>
        <label className='text-sm font-medium text-white mb-1 flex items-center justify-between '>
          Poll Options
        </label>
        <ul className='flex flex-col gap-3 max-h-[200px] overflow-auto '>
          {pollOptions.map(option => (
            <li>
              <div className='flex gap-2'>
                <p className='flex-grow rounded-lg px-3 py-2 border-2 border-gray-600 rounded'>
                  {option}
                </p>
                <Button className=''>
                  <Pen />
                </Button>
                <Button
                  variant='danger'
                  onClick={e => {
                    e.preventDefault();
                    setPollOptions(pollOptions.filter(i => i !== option));
                  }}
                >
                  <TrashBinMinimalistic />
                </Button>
              </div>
            </li>
          ))}
        </ul>
        <div className=' gap-2 flex'>
          <input
            className={`w-full pr-3 py-2.5 bg-gray-700 border-gray-600 rounded-lg 
                  focusable focus:border-transparent
                  text-white placeholder-gray-400 transition-all duration-200`}
            value={optionName}
            onChange={e => setOptionName(e.target.value)}
          />
          <Button
            className=''
            onClick={e => {
              e.preventDefault();
              setPollOptions([...pollOptions, optionName]);
              setOptionName('');
            }}
          >
            <CheckSquare />
          </Button>
        </div>

        <div className='flex gap-2 justify-end'>
          <Button variant='secondary' size='md' onClick={onReset}>
            Cancel
          </Button>
          <Button variant='primary' size='md' type='submit'>
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
}
