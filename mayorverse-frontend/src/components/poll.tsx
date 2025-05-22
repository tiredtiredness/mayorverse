import { Poll as PollType } from '@/mocks/cities';
import { useState } from 'react';
import { Button } from './ui/button';

interface IPoll {
  poll: PollType & {
    totalVotes?: number;
    options: {
      id: string;
      text: string;
      votes?: number;
      disabled?: boolean;
    }[];
  };
  type?: 'radio' | 'checkbox';
  onSubmit?: (value: string | string[]) => Promise<void> | void;
}

export function Poll({ poll, type = 'radio', onSubmit }: IPoll) {
  const [selected, setSelected] = useState<string | string[] | null>(
    type === 'radio' ? null : []
  );
  const [hasVoted, setHasVoted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSelectedRadio = (id: string) => selected === id;
  const isSelectedCheckbox = (id: string) =>
    Array.isArray(selected) && selected.includes(id);
  const isChecked = type === 'radio' ? isSelectedRadio : isSelectedCheckbox;
  const roundness = {
    outer: type === 'radio' ? 'rounded-full' : 'rounded-sm',
    inner: type === 'radio' ? 'rounded-full' : 'rounded-xs',
  };

  const handleVote = (id: string) => {
    if (hasVoted) return;
    if (type === 'radio') {
      setSelected(id);
    } else {
      if (Array.isArray(selected) && selected.includes(id)) {
        setSelected(selected.filter(item => item !== id));
      } else {
        setSelected([...(Array.isArray(selected) ? selected : []), id]);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected || (Array.isArray(selected) && selected.length === 0)) return;

    setIsSubmitting(true);
    try {
      await onSubmit?.(selected);
    } catch (err) {
    } finally {
      setHasVoted(true);
      setIsSubmitting(false);
    }
  };

  const isDisabled =
    !selected || (Array.isArray(selected) && selected.length === 0);

  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-4 border border-teal-700 rounded p-4 bg-gray-800'
    >
      <h3 className='text-xl font-semibold text-white'>{poll?.name}</h3>
      <ul className='space-y-3'>
        {poll?.pollOptions?.map(option => {
          const percent =
            hasVoted && poll.totalVotes
              ? Math.round(((option.votes || 0) / poll.totalVotes) * 100)
              : 0;
          return (
            <li key={option.id}>
              <label
                className={`flex items-center gap-3 cursor-pointer group ${
                  option.disabled || hasVoted
                    ? 'cursor-not-allowed opacity-60'
                    : ''
                }`}
              >
                <div className='relative ml-1'>
                  <input
                    type={type}
                    name={poll.id}
                    id={option.id}
                    className='absolute opacity-0 w-0 h-0'
                    checked={isChecked(option.id)}
                    disabled={hasVoted || option.disabled}
                    onChange={() => handleVote(option.id)}
                  />
                  <span
                    className={`
                      absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                      w-4 h-4 ${roundness.outer} border-2 transition-all 
                      flex items-center justify-center
                      ${
                        isChecked(option.id)
                          ? 'border-teal-600'
                          : 'border-gray-400'
                      } group-hover:border-teal-400
                    `}
                  >
                    <span
                      className={`inline-block w-2 h-2 ${
                        roundness.inner
                      } bg-teal-600 transition-transform ${
                        isChecked(option.id) ? 'scale-100' : 'scale-0'
                      }`}
                    />
                  </span>
                </div>
                <div className='flex-1'>
                  <span
                    className={`text-sm ${
                      isChecked(option.id)
                        ? 'text-teal-400'
                        : 'text-white group-hover:text-teal-300'
                    }`}
                  >
                    {option.name}
                  </span>
                  {hasVoted && (
                    <>
                      <div className='h-2 mt-1 bg-gray-600 rounded overflow-hidden'>
                        <div
                          className='h-full bg-teal-600 transition-all'
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <div className='text-xs text-gray-400'>{percent}%</div>
                    </>
                  )}
                </div>
              </label>
            </li>
          );
        })}
      </ul>
      {!hasVoted && (
        <Button
          type='submit'
          variant='primary'
          disabled={isDisabled || isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      )}
      {hasVoted && (
        <p className='text-sm text-teal-400 text-center'>
          Thank you for voting!
        </p>
      )}
    </form>
  );
}
