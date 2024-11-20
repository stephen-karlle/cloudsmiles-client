import PhoneIcon from '@icons/linear/PhoneIcon';
import { useState, ChangeEvent, ForwardRefRenderFunction, forwardRef } from 'react'

interface IPhoneInput {
  className?: string;
  value?: string | number;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  didError?: Boolean;
}

const PhoneInput: ForwardRefRenderFunction<HTMLInputElement, IPhoneInput> = (
  { className, value, placeholder, onChange, onBlur ,isDisabled, didError,},
  ref
) => {

  const [isFocused, setIsFocused] = useState(false);
  const [prevValue, setPrevValue] = useState(value);

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value && !/^\d*$/.test(e.currentTarget.value)) {
      e.currentTarget.value = prevValue as string;
    } else {
      setPrevValue(e.currentTarget.value);
    }
  };

  return (
    <div className={className +  ` ${didError ? " ring-1 ring-rose-500 outline outline-offset-1 outline-3 outline-rose-100": (isDisabled ? "ring-1 ring-gray-200 cursor-not-allowed":" ring-1 ring-gray-200")} flex px-2 h-10 items-center justify-center rounded-md ` + (isFocused && !didError ?  "ring-1 ring-lime-500 outline outline-offset-1 outline-3 outline-lime-100" : '')}>
      <div className="flex-shrink-0">
        <PhoneIcon className={`w-8 h-5  ${didError ? " fill-rose-500" : " fill-gray-400"}`} />
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
        maxLength={11}
        onKeyDown={(e) => {
          if (!e.ctrlKey && !e.metaKey && !["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Backspace"].includes(e.key)) {
            e.preventDefault();
          }
        }}
        onInput={handleInput}
      />
    </div>
  )
}

export default forwardRef(PhoneInput)