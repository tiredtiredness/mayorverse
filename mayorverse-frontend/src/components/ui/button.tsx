import Link from "next/link";
import {ButtonHTMLAttributes} from "react";

const buttonVariants = {
  primary:
    "focusable bg-teal-600 text-white hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-900/50 active:bg-teal-800",
  secondary:
    "focusable-border active:bg-teal-800 border border-teal-600 text-teal-500  hover:bg-teal-700 hover:text-white hover:border-teal-700 hover:shadow-lg hover:shadow-teal-900/50",
  transparent:
    "focusable-border border active:bg-teal-800 border-transparent text-teal-500 focus:border hover:bg-teal-700 hover:text-white hover:border-teal-700 hover:shadow-lg hover:shadow-teal-900/50",
  link: "focusable p-1 rounded text-white",
  danger:
    " bg-red-700 text-white hover:bg-red-800 hover:shadow-lg hover:shadow-red-900/50 active:bg-red-900 border-2 border-transparent active:border-red-400",
  outlined: "focusable-border border-teal-600 active:bg-teal-800",
};

const buttonSizes = {
  sm: "px-2 py-1 text-sm rounded-sm",
  md: "px-2 py-1 text-md rounded-md",
  lg: "px-6 py-3 text-lg rounded-lg ",
};

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  href?: string;
  className?: string;
  isLoading?: boolean;
}

export function Button({
                         variant = "primary",
                         size = "md",
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
        className={`inline-flex ${buttonVariants[variant]} ${
          buttonSizes[size]
        }  hover:cursor-pointer ${
          isLoading && "brightness-90"
        } ${className}  transition-colors duration-300`}
      >
        {children}
      </div>
    </Link>
  ) : (
    <button
      className={`${buttonVariants[variant]} ${
        buttonSizes[size]
      }  hover:cursor-pointer  ${
        isLoading && "brightness-90"
      } ${
        disabled && "opacity-50 cursor-not-allowed"
      } ${className} transition-all duration-300`}
      {...props}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
