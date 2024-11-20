import { useState, ChangeEvent, ReactNode } from 'react'
import { TextareaAutosize } from '@mui/base/TextareaAutosize'

interface ITextBox {
  className?: string;
  value?: string | number;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  isDisabled?: boolean;
  icon?: ReactNode;
  button?: ReactNode; 
  didError?: Boolean;
  maxLength?: number;
  maxRows?: number;
}

const TextArea= (
  { className, value, placeholder, onChange, onBlur, isDisabled , icon, button, didError, maxLength, maxRows}: ITextBox,
) => {

  const [isFocused, setIsFocused] = useState(false);

  return (
    <div 
      className={className +  ` h-fit 
        ${didError ? " ring-1 ring-rose-500 text-rose-500 outline outline-offset-1 outline-3 outline-rose-100": 
        (isDisabled ? " ring-1 ring-gray-200 cursor-not-allowed text-sm ":" ring-1 ring-gray-200")} 
        flex gap-2 overflow-clip items-start justify-start rounded-md ` + 
        (isFocused && !didError ?  "ring-1 ring-lime-500 outline outline-offset-1 outline-3 outline-lime-100" : '')
      }
    >
      {icon ? (
        <div className="flex-shrink-0">
          {icon}
        </div>
        ) : null
      }
      <TextareaAutosize 
        value={value}
        className={` ${didError ? "placeholder:text-rose-500 text-sm" :(isDisabled ? "placeholder:text-gray-400 cursor-not-allowed text-gray-400 bg-white": "placeholder:text-gray-500 font-normal text-gray-700 text-sm placeholder:font-normal placeholder:text-sm")} outline-none h-full w-full rounded-md px-4 py-2  flex-1 resize-none`}
        placeholder={placeholder}
        onBlur={(e) => {
          setIsFocused(false);
          if (onBlur) onBlur(e);
        }}
        minRows={3}
        onFocus={() => setIsFocused(true)}
        onChange={onChange}
        disabled={isDisabled}
        maxLength={maxLength}
        maxRows={maxRows}
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

export default TextArea