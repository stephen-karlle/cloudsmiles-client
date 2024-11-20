import { useState, ChangeEvent, ReactNode, ForwardRefRenderFunction, forwardRef } from 'react'

interface IUnitInput {
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
  unit: string;
}

const UnitInput: ForwardRefRenderFunction<HTMLInputElement, IUnitInput> = (
  { className, value, placeholder, type = "text", onChange, onBlur ,isDisabled, icon, didError, maxLength, onlyNumbers = false, unit},
  ref
) => {

  const [isFocused, setIsFocused] = useState(false);
  const [prevValue, setPrevValue] = useState(value);

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (onlyNumbers && e.currentTarget.value && !/^\d*$/.test(e.currentTarget.value)) {
      e.currentTarget.value = prevValue as string;
    } else {
      setPrevValue(e.currentTarget.value);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    if (inputValue === "") {
      inputValue = "0";
    }

    if (inputValue !== "0") {
      inputValue = inputValue.replace(/^0+/, "");
    }

    if (onChange) onChange({ ...e, target: { ...e.target, value: inputValue } });
  };


  return (
    <div className={className +  ` ${didError ? " ring-1 ring-rose-500 outline outline-offset-1 outline-3 outline-rose-100": (isDisabled ? "ring-1 ring-gray-200 cursor-not-allowed":" ring-1 ring-gray-200")} flex px-2 h-10 items-center justify-center rounded-md ` + (isFocused && !didError ?  "ring-1 ring-lime-500 outline outline-offset-1 outline-3 outline-lime-100" : '')}>
      {icon ? (
        <div className="flex-shrink-0">
          {icon}
        </div>
        ) : null
      }
      <input 
        ref={ref}
        value={value}
        className={` ${didError ? "placeholder:text-rose-500 text-sm text-rose-500" :(isDisabled ? "placeholder:text-gray-400 cursor-not-allowed text-gray-400 bg-white": "placeholder:text-gray-500 font-normal text-gray-700 text-sm placeholder:font-normal placeholder:text-sm")} outline-none h-full w-full rounded-md px-2 flex-1  `}
        placeholder={placeholder} 
        type={type} 
        onChange={handleChange} 
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
      <label className={`${didError ? " text-rose-500 " : " text-gray-500 "}  text-sm mr-1`}>{unit}</label>
    </div>
  )
}

export default forwardRef(UnitInput)