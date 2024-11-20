import { useState } from 'react';
import { motion } from 'framer-motion';

interface ISwitch {
  checked: boolean;
  onChange?: (value: boolean) => void;
  didError?: boolean;
}

const Switch = 
({ checked, onChange, didError }: ISwitch) => {
  const [isOn, setIsOn] = useState(checked);

  const toggleSwitch = () => {
    setIsOn(!isOn);
    onChange && onChange(!isOn);
  };

  return (
    <button 
      className={`relative w-10 h-5 px-[2px] rounded-full flex items-center justify-start bg-gray-200 transition-colors duration-150 ease-in ${didError ? " bg-rose-50 ring-1 ring-rose-500 " : isOn ? 'bg-lime-500' : 'bg-gray-300'}`}
      onClick={toggleSwitch}
      type="button"
    >
      <motion.div 
        className={`absolute w-4 h-4 rounded-full ${didError ? " bg-rose-500 " : " bg-white "}  shadow-md`}
        initial={{ x: isOn ? '19px' : '1px' }}
        animate={{ x: isOn ? '19px' : '1px' }}       
        transition={{ duration: 0.3 }}
      />
    </button>
  );
}

export default Switch