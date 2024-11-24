import { ReactNode, MouseEvent, KeyboardEvent } from "react";

interface IButton {
  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children: ReactNode;
  variant?: "primary" | "secondary" | "link" | "disabled" | "danger";
}

const Button = ({ className = "", onClick, onKeyDown, type = "button", disabled, children, variant = "primary" }: IButton) => {
  const baseStyles = "text-base h-10 transition-all duration-300 ease-in-out outline-offset-4 flex items-center justify-start gap-1 text-center rounded-md px-4 py-2 flex items-center justify-center";
  const variantStyles = {
    primary: " bg-lime-500 shadow-lg text-white hover:bg-lime-400 active:bg-lime-600 shadow-lime-200 hover:shadow-xl hover:shadow-lime-200 ",
    secondary: " hover:bg-gray-50 bg-white ring-1 text-gray-700 ring-gray-200 ",
    danger: " bg-rose-500 text-white hover:bg-rose-400 active:bg-rose-600 shadow-rose-200 hover:shadow-xl hover:shadow-rose-200 ",
    link: " bg-white text-lime-500 ",
    disabled: " bg-gray-300 text-gray-500 text-white  cursor-not-allowed",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      type={type}
      onKeyDown={onKeyDown}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;