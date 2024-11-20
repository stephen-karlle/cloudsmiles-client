import EyeIcon from '@icons/linear/EyeIcon';
import EyeOffIcon from '@icons/linear/EyeOffIcon';
import { useState, ChangeEvent } from 'react'

interface IPasswordInput {
  className?: string;
  value: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  didError?: Boolean;
  maxLength?: number;
  toggle: boolean
  setToggle: (toggle: boolean ) => void;
}

const PasswordInput = (
  { className, value, placeholder, onChange, onBlur ,isDisabled, didError, maxLength, toggle, setToggle}: IPasswordInput
) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={className +  ` 
      ${didError ? " ring-1 ring-rose-500 outline outline-offset-1 outline-3 outline-rose-100": 
      (isDisabled ? "ring-1 ring-gray-200 cursor-not-allowed text-sm":" ring-1 ring-gray-200")} flex px-2 h-10 items-center justify-center rounded-md ` + 
      (isFocused && !didError ?  `ring-1  outline-offset-1 outline-3 ring-lime-500 outline outline-lime-100` : '')}
    >      
      <input 
        value={value}
        className={` ${didError ? "placeholder:text-rose-500 text-sm text-rose-500" :(isDisabled ? "placeholder:text-gray-400 cursor-not-allowed text-gray-400 bg-white": "placeholder:text-gray-500 font-normal text-gray-700 text-sm placeholder:font-normal placeholder:text-sm")} outline-none h-full w-full rounded-md px-2 flex-1  `}
        placeholder={placeholder} 
        type={toggle ? "password" : "text"}
        onChange={onChange} 
        onBlur={(e) => {
          setIsFocused(false);
          if (onBlur) onBlur(e);
        }}
        onFocus={() => setIsFocused(true)}
        disabled={isDisabled} 
        maxLength={maxLength}
      />
      { value &&       
        <button type="button" className="w-7 h-7 p-1" onClick={()=>setToggle(!toggle)}>
          {
            toggle ? (
              <EyeIcon className={`w-full h-full ${didError ? " stroke-rose-500 " : " stroke-gray-500 "} `} />
            ) : (
              <EyeOffIcon className={`w-full h-full ${didError ? " stroke-rose-500 " : " stroke-gray-500 "}`} />
            )
          }
        </button>
      }
    </div>
  )
}

export default PasswordInput
