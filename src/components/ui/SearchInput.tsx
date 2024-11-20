import { useState, ChangeEvent, ReactNode, useRef } from 'react'
import PopOver from './PopOver';
import SearchIcon from '@icons/linear/SearchIcon';

type SearchProps = {
  className?: string;
  value?: string | number;
  placeholder?: string;
  type?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  icon?: ReactNode;
  didError?: Boolean;
  maxLength?: number;
  onlyNumbers?: boolean;
  children: ReactNode;
  isOpen: boolean;
  handler?: () => void;
}

const SearchInput = (
  { 
    className, 
    value, 
    placeholder, 
    type = "text", 
    onChange, 
    onBlur ,
    isDisabled, 
    didError, 
    maxLength, 
    onlyNumbers = false, 
    children, 
    isOpen = false, 
    handler 
  }: SearchProps
  
) => {

  const [isFocused, setIsFocused] = useState(false);
  const [prevValue, setPrevValue] = useState(value);
  const anchorRef = useRef<HTMLDivElement>(null);
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (onlyNumbers && e.currentTarget.value && !/^\d*$/.test(e.currentTarget.value)) {
      e.currentTarget.value = prevValue as string;
    } else {
      setPrevValue(e.currentTarget.value);
    }
  };

  return (
    <div 
      ref={anchorRef}
      className={className +  ` 
      ${didError ? " ring-1 ring-rose-500 outline outline-offset-1 outline-3 outline-rose-100": 
      (isDisabled ? "ring-1 ring-gray-200 cursor-not-allowed text-sm ":" ring-1 ring-gray-200 bg-gray-50")} 
      flex px-3 relative h-10 items-center justify-center rounded-full ` + 
      (isFocused && !didError ?  "ring-1 ring-lime-500 outline outline-offset-1 outline-3 outline-lime-100" : '')}
    >
      <SearchIcon className={`stroke-2 ${didError ? " stroke-rose-500" : "stroke-gray-500"} w-4 h-4`} />
      <input 
        value={value}
        className={` ${didError ? "placeholder:text-rose-500 text-sm text-rose-500" :
          (isDisabled ? "placeholder:text-gray-400 cursor-not-allowed text-gray-400 bg-gray-50": 
            "placeholder:text-gray-500 font-normal text-gray-700 text-sm placeholder:font-normal placeholder:text-sm ")} 
            outline-none h-full w-full rounded-full px-2 flex-1  `}
        placeholder={placeholder} 
        type={type} 
        onChange={onChange} 
        onBlur={(e) => {
          setIsFocused(false);
          if (onBlur) onBlur(e);
        }}
        onFocus={() => setIsFocused(true)}
        disabled={isDisabled} 
        maxLength={maxLength}
        onKeyDown={onlyNumbers ? (e) => {
          if (!e.ctrlKey && !e.metaKey && !["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Backspace"].includes(e.key)) {
            e.preventDefault();
          }
        } : undefined}
        onInput={handleInput}
      />

      <PopOver
        anchorRef={anchorRef}
        isOpen={isOpen}
        className="p-4 w-full min-h-10 max-h-60 top-12 overflow-y-scroll flex flex-col gap-2"
        onClose={handler ? handler : () => {} }
        position='top'
      >
        {children}
      </PopOver>
    </div>
  )
}

export default SearchInput