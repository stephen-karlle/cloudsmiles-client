import CheckIcon from "@icons/linear/CheckIcon";
import ChevronIcon from "@icons/linear/ChevronIcon";
import { useRef, useState,} from "react";
import { AnimatePresence, motion } from "framer-motion";
import useClickOutside from "@hooks/useClickOutside";


export interface IOption {
  id: string;
  name: string;
}

interface ISelectionBox{
  className?: string;
  options: IOption[] | [];
  placeholder: string;
  value?: string | null;
  setValue: (value: IOption) => void;
  isDisabled?: boolean;
  didError?: boolean;
}

const SelectionBox = (
  {className, options, placeholder, value, setValue, didError, isDisabled }:ISelectionBox, ) => {

  const [ open, setOpen ] = useState(false)

  const anchorRef = useRef<HTMLButtonElement>(null);

  useClickOutside(anchorRef, () => setOpen(false));


  return (
    <button
      ref={anchorRef}
      className={
        className +
        ` ${didError ? "z-0 ring-1 ring-rose-500 outline outline-offset-1 outline-3 outline-rose-100" : isDisabled ? "ring-1 ring-gray-200 cursor-not-allowed" : "ring-1 ring-gray-200"} pl-3 pr-2 h-10  rounded-md relative w-full flex items-center justify-between `
      }
      onClick={isDisabled ? () => {} : () => setOpen((prev) => !prev)}
      type="button"
    >
      <p className={`${didError ? "text-rose-500" : value ? "text-gray-700" : "text-gray-500"}  text-sm overflow-hidden `}>
        {value ? value : `Choose ${placeholder}`}
      </p>
      <ChevronIcon className={`${didError ? "stroke-rose-500" : "stroke-gray-500"} w-5 h-5`} />
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="overflow-hidden w-full absolute bg-white left-0 top-12 ring-1 ring-gray-200 rounded-md z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white overflow-y-scroll overflow-x-hidden min-h-9 max-h-40">
            <div className="flex flex-col items-start p-2">
              {options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-md px-2 w-full text-start hover:bg-gray-50 py-1.5 rounded-md text-md text-gray-700"
                  onClick={(e) => {
                    e.preventDefault();
                    setValue(option);
                    setOpen(false);
                  }}
                >
                  <p className="text-sm text-gray-700 truncate overflow-clip text-ellipsis">{option.name}</p>
                  {option.name === value && <CheckIcon className="w-3 h-3 stroke-gray-700" />}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </button>
  )
}

export default SelectionBox