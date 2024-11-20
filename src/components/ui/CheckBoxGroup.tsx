import { motion } from "framer-motion";

type CheckBoxGroupType = {
  options: string[];
  className: string;
  didError: boolean;
  value: string[];
  onChange: (value: string[]) => void;
  isDisabled?: boolean;

}

const CheckBoxGroup = ({
  options,
  className,
  didError,
  value,
  onChange,
  isDisabled
}: CheckBoxGroupType) => {

  const handleSelect = (option: string) => {
    if (isDisabled) return;
    if (value.includes(option)) {
      onChange(value.filter((item) => item !== option));
    } else {
      onChange([...value, option]);
    }
  }

  
  const pathVariants = {
    checked: { pathLength: 1, transition: { delay: 0.1 } },
    unchecked: { pathLength: 0 },
  };

  const divVariants = {
    checked: { scale: 1.2, opacity: 1 },
    unchecked: { scale: 0, opacity: 0 },
  };
  

  return (
    <article className="flex items-center justify-center w-full gap-4">
      {options.map((option, index) => {
        const isSelected = (value).includes(option);        
        return (
          <button
            onClick={() => handleSelect(option)}
            key={index}
            type="button"
            className={className + ` h-10 px-4 rounded-md ring-1 text-sm flex items-center gap-3 justify-start
              ${isSelected ? 'ring-lime-500 text-lime-500' : 'ring-gray-200 text-gray-500'}
              ${didError && 'ring-red-500 text-red-500'}
              ${isDisabled && 'cursor-not-allowed'}
            `}
          >
            <section className={`w-4 h-4 ring-1 rounded-md 
              ${isSelected ? 'ring-lime-500' : 'ring-gray-200 '}
              ${didError && 'ring-red-500'}
              `}>
              <motion.div
                variants={divVariants}
                initial="unchecked"
                className={` z-0 w-4 h-4 p-[1px] bg-lime-500 rounded-md flex items-center justify-center`}
                animate={isSelected ? "checked" : "unchecked"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-[14px] h-[14px] stroke-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <motion.path
                    d="M4 12L9 17L20 6"
                    variants={pathVariants}
                    initial="unchecked"
                    animate={isSelected ? "checked" : "unchecked"}
                  />
                </svg>
              </motion.div>
            </section>
            {option}
          </button>
        )
      })}
    </article>
  )
}

export default CheckBoxGroup