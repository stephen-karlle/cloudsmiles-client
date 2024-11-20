import { motion } from 'framer-motion';

interface ICheckbox {
  className?: string;
  item: string;
  isChecked: boolean;
  handleToggle: (item: string) => void;
  hideLabel?: boolean;
  didError?: boolean;
}

const CheckBox  
= ({className, item, isChecked, handleToggle, didError, hideLabel = false}: ICheckbox)=> {

  
  const pathVariants = {
    checked: { pathLength: 1, transition: { delay: 0.1 } },
    unchecked: { pathLength: 0 },
  };

  const divVariants = {
    checked: { scale: 1.2, opacity: 1 },
    unchecked: { scale: 0, opacity: 0 },
  };
  
  return (
    <button 
      className={className + ` flex-shrink-0 px-4 flex items-center justify-start w-full gap-4 text-sm transition-colors duration-300 ease-out ${ isChecked ? "text-gray-700" : "text-gray-500"} `}
      onClick={() => handleToggle(item)}
      type="button"
    >
      <div
        className={`w-4 h-4 ring-1 rounded-md flex-shrink-0 flex items-center justify-center relative bg-white text-gray-700 ${didError ? " ring-rose-500 " : " ring-gray-200 "}`}
      >
        <motion.div
          variants={divVariants}
          initial="unchecked"
          className="absolute w-4 h-4 p-[1px] bg-lime-500 rounded-md flex items-center justify-center"
          animate={isChecked ? "checked" : "unchecked"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-[14px] h-[14px] stroke-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <motion.path
              d="M4 12L9 17L20 6"
              variants={pathVariants}
              initial="unchecked"
              animate={isChecked ? "checked" : "unchecked"}
            />
          </svg>
        </motion.div>
      </div>
      {hideLabel === false &&  <p className={`flex text-sm ${didError ? " text-rose-500 " :isChecked ? " text-gray-700 " : " text-gray-500 "} `}>{item}</p>}
    </button>
  );
}

export default CheckBox