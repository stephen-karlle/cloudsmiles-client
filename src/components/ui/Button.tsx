import { ReactNode, MouseEvent, KeyboardEvent, useState } from "react";

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
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const baseStyles = "text-base h-10 transition-all duration-300 ease-in-out outline-offset-4 flex items-center justify-start gap-1 text-center rounded-md px-4 py-2 flex items-center justify-center";
  const variantStyles = {
    primary: " bg-lime-500 shadow-lg text-white hover:bg-lime-400 active:bg-lime-600 shadow-lime-200 hover:shadow-xl hover:shadow-lime-200 ",
    secondary: " hover:bg-gray-50 bg-white ring-1 text-gray-700 ring-gray-200 ",
    danger: " bg-rose-500 text-white hover:bg-rose-400 active:bg-rose-600 shadow-rose-200 hover:shadow-xl hover:shadow-rose-200 ",
    link: " bg-white text-lime-500 ",
    disabled: " bg-gray-300 text-gray-500 text-white  cursor-not-allowed",
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    // Prevent click if button is disabled or still loading
    if (disabled || isLoading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    
    // Perform the click action if enabled
    onClick && onClick(event);
    
    // Set loading state to true to prevent further clicks
    setIsLoading(true);
  
    // Reset loading state after a timeout (to simulate an async action)
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <button
      onClick={handleClick}
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