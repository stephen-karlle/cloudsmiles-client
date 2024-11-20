import { ChangeEvent, useState } from "react";

interface IAmountInput {
  value?: string | number,
  className: string,
  didError?: boolean,
  isDisabled?: boolean,
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  maxLength: number,
  size?: "sm" | "md";
  max?: number;
  min?: number;
}

const AmountInput = (
  { 
    className, 
    value = "", 
    onChange, 
    onBlur, 
    isDisabled, 
    didError,
    maxLength, 
    size = "md",
    max,
    min = 0,
  }:
  IAmountInput,
) => {

  const [isFocused, setIsFocused] = useState(false);

  const handleIncrement = () => {
    const numericValue = Number(value);
    if (max !== undefined && numericValue >= max) return;
  
    if (!isDisabled) {
      const newValue = String(numericValue + 1);
      if (onChange) onChange({ target: { value: newValue } } as ChangeEvent<HTMLInputElement>);
    }
  };
  
  const handleDecrement = () => {
    const numericValue = Number(value);
    if (numericValue <= min || isDisabled) return;
  
    const newValue = String(Math.max(min, numericValue - 1));
    if (onChange) onChange({ target: { value: newValue } } as ChangeEvent<HTMLInputElement>);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
  
    // Ensure value does not exceed max
    if (max !== undefined && Number(inputValue) > max) {
      inputValue = String(max);
    }
  
    // Ensure value does not fall below min
    if (min !== undefined && Number(inputValue) < min) {
      inputValue = String(min);
    }
  
    // Handle empty input and leading zeros
    if (inputValue === "") {
      inputValue = "0";
    } else if (inputValue !== "0") {
      inputValue = inputValue.replace(/^0+/, "");
    }
  
    if (onChange) onChange({ ...e, target: { ...e.target, value: inputValue } });
  };
  
  const getSize = (size: "sm" | "md" | "lg") => {
    switch (size) {
      case "sm":
        return {
          input: "h-8",
          button: "w-6 h-6 text-xl",
        };
      case "md":
        return {
          input: "w-10",
          button: "w-8 h-8 text-2xl",
        };
      default:
        return {
          input: "h-10",
          button: "w-8 h-8 text-2xl",
        };
    }
  };
  

  const sizes = getSize(size);


  return (
    <div className={className + " " + sizes.input + ` flex items-center justify-center gap-1 ${didError ? " ring-1 ring-rose-500 outline outline-offset-1 outline-3 outline-rose-100": (isDisabled ? "ring-1 ring-gray-200 cursor-not-allowed":" ring-1 ring-gray-200")} flex px-2 h-10 items-center justify-center rounded-md ` + (isFocused && !didError ? "ring-1 ring-lime-500 outline outline-offset-1 outline-3 outline-lime-100" : '')}>
      <button 
        type="button" 
        className={sizes.button + ` flex-shrink-0 rounded-md outline-none flex items-center justify-center ${didError ? " text-rose-500" : " text-lime-500"} `}
        onClick={handleDecrement}
        disabled={isDisabled}
      >-</button>
      <input 
        type="text" 
        value={value}
        className={` ${didError ? "placeholder:text-rose-500 text-sm text-rose-500" :(isDisabled ? "placeholder:text-gray-400 cursor-not-allowed text-gray-400 bg-white": "placeholder:text-gray-500 font-normal text-gray-700 text-sm placeholder:font-normal placeholder:text-sm")} outline-none h-full rounded-md min-w-12 text-center `}
        onBlur={(e) => {
          setIsFocused(false);
          if (onBlur) onBlur(e);
        }}
        onFocus={() => setIsFocused(true)}
        onKeyDown={(e) => {
          if (
            (!e.ctrlKey && !e.metaKey && !["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Backspace"].includes(e.key)) ||
            ((e.ctrlKey || e.metaKey) && ["v", "c"].includes(e.key.toLowerCase()))
          ) {
            e.preventDefault();
          }
        }}
        onChange={handleChange}
        maxLength={maxLength}
        disabled={isDisabled}
      />
      <button 
        type="button" 
        className={sizes.button + ` flex-shrink-0 rounded-md outline-none flex items-center justify-center ${didError ? " text-rose-500" : " text-lime-500"} `}
        onClick={handleIncrement}
        disabled={isDisabled}
      >+</button>
    </div>
  )
}

export default AmountInput
