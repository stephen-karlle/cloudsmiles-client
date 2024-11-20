import { useState, ChangeEvent, ReactNode, ForwardRefRenderFunction, forwardRef } from 'react';

interface IPriceInput {
  className?: string;
  value?: string;
  placeholder?: string;
  type?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  icon?: ReactNode;
  button?: ReactNode; 
  didError?: Boolean;
  maxLength?: number;
  currency: string;
}

const PriceInput: ForwardRefRenderFunction<HTMLInputElement, IPriceInput> = (
  { className, value, placeholder, onChange, onBlur ,isDisabled, icon, button, didError, maxLength, currency,},
  ref
) => {

  const [isFocused, setIsFocused] = useState(false);
  const [prevValue, setPrevValue] = useState(value);

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    let newValue = e.currentTarget.value;
  
    // Remove leading zeros unless the value is "0"
    if (newValue.length > 1 && newValue.startsWith('0')) {
      newValue = newValue.replace(/^0+/, '');
    }
  
    if (newValue && !/^\d*\.?\d*$/.test(newValue)) {
      e.currentTarget.value = prevValue?.toString() || '';
    } else {
      setPrevValue(newValue);
      e.currentTarget.value = newValue;
    }
  };
  return (
    <div className={className +  ` ${didError ? " ring-1 ring-rose-500 outline outline-offset-1 outline-3 outline-rose-100": (isDisabled ? "ring-1 ring-gray-200 cursor-not-allowed":" ring-1 ring-gray-200")} px-2 flex h-10 items-center justify-center rounded-md ` + (isFocused && !didError ?  "ring-1 ring-lime-500 outline outline-offset-1 outline-3 outline-lime-100" : '')}>
      {icon ? (
        <div className="flex-shrink-0">
          {icon}
        </div>
        ) : null
      }
      <div 
        className={`h-10 w-6 flex items-center justify-center text-lg ${didError ? " text-rose-500" : " text-gray-500 " }`}
      >
        {currency}
      </div>
      <input 
        ref={ref}
        value={value}
        className={` ${didError ? "placeholder:text-rose-500 text-sm text-rose-500" :(isDisabled ? "placeholder:text-gray-400 cursor-not-allowed text-gray-400 bg-white": "placeholder:text-gray-500 font-normal text-gray-700 text-sm placeholder:font-normal placeholder:text-sm")} outline-none h-full w-full rounded-md px-2 flex-1  `}
        placeholder={placeholder} 
        type="text" 
        onChange={onChange} 
        onBlur={(e) => {
          setIsFocused(false);
          if (onBlur) onBlur(e);
        }}
        onFocus={() => setIsFocused(true)}
        disabled={isDisabled} 
        maxLength={maxLength}
        onKeyDown={(e) => {
          if (!e.ctrlKey && !e.metaKey && !["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Backspace", "."].includes(e.key)) {
            e.preventDefault();
          }
          if (e.key === '.' && e.currentTarget.value.includes('.')) {
            e.preventDefault();
          }
        }}
        onInput={handleInput}
      />
      {button ? (
        <div className="flex-shrink-0">
          {button}
        </div>
        ) : null
      }
    </div>
  )
}

export default forwardRef(PriceInput);