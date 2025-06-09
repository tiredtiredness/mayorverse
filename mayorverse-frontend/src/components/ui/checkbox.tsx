interface ICheckbox extends React.InputHTMLAttributes<HTMLInputElement> {
  isSelected?: boolean;
  setSelected?: (value: boolean) => void;
}

export function Checkbox({
  isSelected = false,
  setSelected,
  ...props
}: ICheckbox) {
  return (
    <input
      type="checkbox"
      name=""
      id=""
      onChange={() => setSelected?.(!isSelected)}
      {...props}
      className={`relative rounded-md   border-gray-600 text-teal-600 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-shadow appearance-none border-2 w-5 h-5 ${"checked:before:absolute checked:before:block checked:before:w-3 checked:before:h-3 checked:before:rounded-xs checked:before:top-0.5 checked:before:left-0.5 checked:before:bg-teal-400 "} `}
    />
  );
}
