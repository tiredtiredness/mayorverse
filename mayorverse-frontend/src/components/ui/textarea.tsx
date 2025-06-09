interface ITextarea extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function Textarea({ label, ...props }: ITextarea) {
  return (
    <div>
      {label && (
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          {label}
        </label>
      )}
      <textarea
        rows={5}
        className=" bg-gray-700 border-2 border-gray-600 w-full min-h-[42px] px-3 py-2.5 rounded-lg 
                 focus:border-teal-600 active:border-teal-600 focus:outline-none
                  text-white placeholder-gray-400 transition-all duration-200"
        {...props}
      />
    </div>
  );
}
