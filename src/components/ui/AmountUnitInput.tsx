import { ChangeEvent, useRef, useState } from "react";
import useClickOutside from "@hooks/useClickOutside";
import CheckIcon from "@icons/linear/CheckIcon";

interface IAmountInput {
  textValue: string,
  unitValue: string,
  className: string,
  didTextError?: boolean,
  didUnitError?: boolean,
  isDisabled?: boolean,
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onSelect: (value: string) => void;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  maxLength: number,
  size?: "sm" | "md";
  options: string[];
}

const AmountUnitInput = (
  { 
    className, 
    textValue = "", 
    unitValue= "",
    onChange, 
    onSelect, 
    onBlur, 
    isDisabled, 
    didTextError, 
    didUnitError,
    maxLength, 
    options
  }: IAmountInput,
) => {


  const [ open, setOpen ] = useState(false)
  const [isFocused, setIsFocused] = useState(false);

  const dropDownRef = useRef<HTMLButtonElement>(null);

  const handleSelect = (value:string) =>{
    onSelect(value)
    setOpen(false)
  }

  useClickOutside(dropDownRef, () => setOpen(false))

  const handleIncrement = () => {
    if (!isDisabled) {
      const newValue = String(Number(textValue) + 1);
      if (onChange) onChange({ target: { value: newValue } } as ChangeEvent<HTMLInputElement>);
    }
  };

  const handleDecrement = () => {
    if (!isDisabled) {
      const newValue = String(Math.max(0, Number(textValue) - 1));
      if (onChange) onChange({ target: { value: newValue } } as ChangeEvent<HTMLInputElement>);
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
    <div className={`${className} w-full relative h-10 flex items-center justify-center rounded-md
      ${isDisabled ? "ring-1 ring-gray-200 cursor-not-allowed" : "ring-1 ring-gray-200"}
      ${isFocused && (!didTextError || !didUnitError) ? "ring-1 ring-lime-500 outline outline-offset-1 outline-3 outline-lime-100" : ""}
    `}>
      <div className={`w-fit flex flex-1 items-center justify-between h-10 
        ${didTextError && " ring-1 ring-rose-500 rounded-l-md" } `}>
        <button 
          type="button" 
          className={`w-8 h-8 text-2xl flex-shrink-0 rounded-md outline-none flex items-center justify-center ${didTextError ? " text-rose-500" : " text-lime-500"} `}
          onClick={handleDecrement}
          disabled={isDisabled}
        >
          -
        </button>
        <input 
          type="text" 
          value={textValue}
          className={` 
            ${didTextError ? "placeholder:text-rose-500 text-sm text-rose-500" :
            (isDisabled ? "placeholder:text-gray-400 cursor-not-allowed text-gray-400 bg-white": 
              "placeholder:text-gray-500 font-normal text-gray-700 text-sm placeholder:font-normal placeholder:text-sm")} 
              outline-none h-full rounded-md min-w-12 text-center max-w-12
            `}
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
          className={`w-8 h-8 text-2xl flex-shrink-0 rounded-md outline-none flex items-center justify-center ${didTextError ? " text-rose-500" : " text-lime-500"} `}
          onClick={handleIncrement}
          disabled={isDisabled}
        >
          +
        </button>
      </div>
      <button 
        ref={dropDownRef}
        className={`flex-shrink-0 border-l min-w-16 h-10 pr-2 rounded-r-md
          ${ didUnitError ? "  ring-1 ring-rose-500 " : " border-gray-200 "}
          ${ didTextError && !didUnitError ? " border-rose-500 " : " border-gray-200 "} 
        `}
        onClick={isDisabled ? () => {}: ()=>setOpen((prev)=>!prev)}
        type="button"
        onBlur={() => {
          setIsFocused(false);
        }}
        onFocus={() => setIsFocused(true)}
      >
        <div className="flex items-center justify-center relative w-full pl-2 truncate">          
          <p className={`${didUnitError ? "text-rose-500" : unitValue ? " text-gray-700 ": " text-gray-400"} text-sm`}>{unitValue ? unitValue : `unit`}</p>
        </div>

        { open &&
          <div 
            className="overflow-hidden w-full absolute bg-white left-0 top-12 ring-1 ring-gray-200 rounded-md z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className= "overflow-y-scroll overflow-x-hidden min-h-9 max-h-40">
              <div className="flex flex-col items-start p-2">
                {options.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-md px-2 truncate w-full text-start hover:bg-gray-50 py-1.5 rounded-md text-md text-gray-700"
                    onClick={() => {
                      handleSelect(option);
                    }}
                  >
                    <p className="text-sm text-gray-700">{option}</p>
                    {option === unitValue && <CheckIcon className="w-4 h-4 stroke-gray-700" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      </button>
    </div>
  )
}

export default AmountUnitInput
