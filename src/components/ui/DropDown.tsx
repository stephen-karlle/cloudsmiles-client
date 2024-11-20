import { Fragment, useRef, useState } from "react";
import useClickOutside from "@hooks/useClickOutside";
import CheckIcon from "@icons/linear/CheckIcon";
import ChevronIcon from "@icons/linear/ChevronIcon";
import SearchIcon from "@icons/linear/SearchIcon";

interface IOptions{
  name: string,
  category: string,
}

interface IDropDown{
  className?: string;
  options: IOptions[];
  placeholder: string;
  value?: string;
  setValue: (value:string) => void;
  isDisabled?: boolean;
  didError?: boolean;
}

const DropDown = ({
  className, 
  options, 
  placeholder, 
  value, 
  setValue, 
  didError, 
  isDisabled 
}: IDropDown) => {

  const [ open, setOpen ] = useState(false)
  const [ searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const dropDownRef = useRef<HTMLButtonElement>(null);

  const handleSelect = (value:string) =>{
    setValue(value)
    setOpen(false)
  }

  const filteredOptions = options.filter((option:IOptions) =>
    option.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useClickOutside(dropDownRef, () => setOpen(false))


  const groupBy = <T,>(list: T[], keyGetter: (input: T) => string): Record<string, T[]> => {    
    const map = new Map<string, T[]>();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return Object.fromEntries(map);
  }

  const optionsByCategory = groupBy(filteredOptions, (option) => option.category);


  return (
    <button 
      ref={dropDownRef}
      className={className +  ` ${didError ? " ring-1 ring-rose-500 outline outline-offset-1 outline-3 outline-rose-100": (isDisabled ? "ring-1 ring-gray-200 cursor-not-allowed":" ring-1 ring-gray-200")} flex px-2 h-10 items-center justify-center rounded-md relative ` + (isFocused && !didError ?  `ring-1  outline-offset-1 outline-3` : '')}
      onClick={isDisabled ? () => {}: ()=>setOpen((prev)=>!prev)}
      type="button"
      onBlur={() => {
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
            <Fragment>
              <div className="px-4 mt-2 w-full h-6 outline-none flex items-center justify-start gap-2">
                <SearchIcon className="w-3 h-3 stroke-neutral-500" />
                <input 
                  type="text" 
                  className="h-9 outline-none w-full " 
                  placeholder={`Search ${placeholder}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <hr className="border-gray-200 mt-2 h-1"/>
            </Fragment>
            <div className="flex flex-col items-start p-2">
              {Object.entries(optionsByCategory).map(([category, options]) => (
                <Fragment key={category}>
                  <p className="text-xs px-2 font-medium tracking-wide text-gray-500">{category}</p>
                  {options.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-md px-2 w-full text-start hover:bg-gray-50  py-1.5 rounded-md text-md text-gray-700"
                      onClick={() => {
                        handleSelect(option.name);
                      }}
                    >
                      <p className="text-sm text-gray-700">{option.name}</p>
                      {option.name === value && <CheckIcon className="w-3 h-3 stroke-gray-700" />}
                    </div>
                  ))}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      }
    </button>
  )
}

export default DropDown