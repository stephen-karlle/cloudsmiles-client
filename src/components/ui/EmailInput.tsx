import MailIcon from '@icons/linear/MailIcon';
import { useState, ChangeEvent, ForwardRefRenderFunction, forwardRef } from 'react'

interface IEmailInput {
  className?: string;
  value?: string | number;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  didError?: Boolean;
}

const EmailInput: ForwardRefRenderFunction<HTMLInputElement, IEmailInput> = (
  { className, value, placeholder, onChange, onBlur ,isDisabled, didError,},
  ref
) => {

  const [isFocused, setIsFocused] = useState(false);


  return (
    <div className={className +  ` ${didError ? " ring-1 ring-rose-500 outline outline-offset-1 outline-3 outline-rose-100": (isDisabled ? "ring-1 ring-gray-200 cursor-not-allowed":" ring-1 ring-gray-200")} flex px-2 h-10 items-center justify-center rounded-md ` + (isFocused && !didError ?  "ring-1 ring-lime-500 outline outline-offset-1 outline-3 outline-lime-100" : '')}>
      <div className="flex-shrink-0">
        <MailIcon className={`w-8 h-5 stroke-white stroke-2  ${didError ? " fill-rose-500" : " fill-gray-400 "}`} />
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
        maxLength={64}
      />
    </div>
  )
}

export default forwardRef(EmailInput)