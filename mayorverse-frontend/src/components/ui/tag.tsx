import { ITag } from '@/types/tag.types';
import { TrashBinMinimalistic } from '@solar-icons/react';
import { MouseEvent } from 'react';

export function Tag({
  tag,
  onDelete,
  onClick,
  isSelected,
}: {
  tag: ITag;
  onDelete?: (e: MouseEvent, id: string) => void;
  onClick?: (e: MouseEvent, name: string) => void;
  isSelected: boolean;
}) {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(e, tag?.id);
    } else if (onClick) {
      onClick(e, tag?.name);
    }
  };
  console.log(isSelected);
  return (
    <div
      className={`relative z-10 flex-shrink-0 text-xs group px-2 py-1 bg-gray-900/50 backdrop-blur-sm rounded-full font-medium border  ${
        isSelected
          ? 'text-teal-500 border-teal-500'
          : 'text-white border-teal-800'
      } active:text-teal-600 `}
    >
      #{tag?.name}
      <button
        className={`absolute w-full opacity-0 h-full left-0 top-0 flex items-center justify-center rounded-full ${
          onDelete !== undefined &&
          'group-hover:bg-red-600/80 group-hover:opacity-100'
        } hover:cursor-pointer ${isSelected && ''} `}
        onClick={handleClick}
      >
        <TrashBinMinimalistic />
      </button>
    </div>
  );
}
