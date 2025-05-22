interface ITextarea extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function Textarea({ label, ...props }: ITextarea) {
  return (
    <div>
      <label htmlFor='description' className='block text-sm font-medium mb-1'>
        {label}
      </label>
      <textarea
        rows={5}
        className='focusable bg-gray-700 border border-gray-600 w-full px-3 py-2.5 rounded-lg 
                 focus:border-transparent
                  text-white placeholder-gray-400 transition-all duration-200 '
        {...props}
      />
    </div>
  );
}
