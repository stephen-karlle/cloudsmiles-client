import useClickOutside from "@hooks/useClickOutside";
import CheckIcon from "@icons/linear/CheckIcon";
import ChevronIcon from "@icons/linear/ChevronIcon";
import { useRef, useState,} from "react";


interface IComboBox{
  className?: string;
  options: string[];
  placeholder: string;
  value?: string;
  setValue: (value:string) => void;
  isDisabled?: boolean;
  didError?: boolean;
  size?: "sm" | "md" | "lg";
}

const ComboBox = (
  {
    className, 
    options, 
    placeholder, 
    value, 
    setValue, 
    didError, 
    isDisabled,
    size = "md"

  }: IComboBox ) => {

  const [ open, setOpen ] = useState(false)
  const [isFocused, setIsFocused] = useState(false);

  const dropDownRef = useRef<HTMLButtonElement>(null);

  const handleSelect = (value:string) =>{
    setValue(value)
    setOpen(false)
  }

  useClickOutside(dropDownRef, () => setOpen(false))


  const getSize = (size: string) => {
    switch (size) {
      case "sm":
        return "min-h-8"
      case "md":
        return "min-h-10"
      case "lg":
        return "min-h-12"
      default:
        return "min-h-10"
    }
  }

  const heightSize = getSize(size)



  return (
    <button 
      ref={dropDownRef}
      className={className 
        +  ` ${didError ? " ring-1 ring-rose-500 outline outline-offset-1 outline-3 outline-rose-100 "
          : (isDisabled ? " ring-1 ring-gray-200 cursor-not-allowed ":" ring-1 ring-gray-200")} 
          flex px-2 ${heightSize} items-center justify-center rounded-md relative ` + 
          (isFocused && !didError ?  ` ring-1  outline-offset-1 outline-3 ` : '')}
      onClick={isDisabled ? () => {}: ()=>setOpen((prev)=>!prev)}
      type="button"
      onBlur={(e) => {
        e.preventDefault();
        setIsFocused(false);
      }}
      onFocus={() => setIsFocused(true)}
    >
      <div className="flex items-center justify-between w-full px-2">          
        <p className={`${didError ? "text-rose-500" : value ? " text-gray-700 ": " text-gray-500"} text-sm`}>{value ? value : `Choose ${placeholder}`}</p>
        <ChevronIcon className={`${didError ? "stroke-rose-500" : "stroke-gray-500"} w-5 h-5`} />
      </div>
      { open &&
        <div 
          className="overflow-hidden w-full absolute bg-white left-0 top-12 ring-1 ring-gray-200 rounded-md "
          onClick={(e) => e.stopPropagation()}
        >
          <div className= "overflow-y-scroll overflow-x-hidden min-h-9 max-h-40">
            <div className="flex flex-col items-start p-2">
              {options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-md px-4 w-full text-start hover:bg-gray-50 py-1.5 rounded-md text-md text-gray-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleSelect(option);
                  }}
                >
                  <p className="text-sm text-gray-700">{option}</p>
                  {option === value && <CheckIcon className="w-4 h-4 stroke-gray-700" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    </button>
  )
}

export default ComboBox