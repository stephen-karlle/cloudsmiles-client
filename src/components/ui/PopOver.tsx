import { forwardRef, RefObject } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';
import useClickOutside from '@hooks/useClickOutside';

interface IPopOver {
  anchorRef: RefObject<HTMLElement>;
  className: string;
  isOpen: boolean;
  onClose: () => void;
  position: 
    'left' | 
    'right' | 
    'top' | 
    'bottom' | 
    // Corners
    'top-left' | 
    'top-right' | 
    'bottom-left' | 
    'bottom-right' | 
    // Center
    'center-bottom' | 
    'center-top' | 
    'center-left' | 
    'center-right';
  children: ReactNode;
}

const PopOver = forwardRef<HTMLDivElement, IPopOver>(
  ({ 
    anchorRef, 
    className, 
    isOpen, 
    position, 
    onClose, 
    children 
  }, 
  ref) => {

  useClickOutside(anchorRef, onClose);
  
  const positionAnimations = {
    bottom: { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 } },
    top: { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 10 } },
    right: { initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -10 } },
    left: { initial: { opacity: 0, x: 10 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 10 } },
    'bottom-right': { initial: { opacity: 0, y: -10, x: -10 }, animate: { opacity: 1, y: 0, x: 0 }, exit: { opacity: 0, y: -10, x: -10 } },
    'bottom-left': { initial: { opacity: 0, y: -10, x: 10 }, animate: { opacity: 1, y: 0, x: 0 }, exit: { opacity: 0, y: -10, x: 10 } },
    'top-right': { initial: { opacity: 0, y: 10, x: -10 }, animate: { opacity: 1, y: 0, x: 0 }, exit: { opacity: 0, y: 10, x: -10 } },
    'top-left': { initial: { opacity: 0, y: 10, x: 10 }, animate: { opacity: 1, y: 0, x: 0 }, exit: { opacity: 0, y: 10, x: 10 } },
    'center-bottom': { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 } },
    'center-top': { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 10 } },
    'center-right': { initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -10 } },
    'center-left': { initial: { opacity: 0, x: 10 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 10 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={positionAnimations[position]?.initial}
          animate={positionAnimations[position]?.animate}
          exit={positionAnimations[position]?.exit}
          transition={{ duration: 0.2 }}
          className={`${className} cursor-default z-10 overflow-hidden h-fit absolute bg-white ring-1 ring-gray-200 rounded-md shadow-lg shadow-gray-200 overflow-y-auto [&::-webkit-scrollbar-track]:bg-white  [&::-webkit-scrollbar-track]:rounded-r-3xl [&::-webkit-scrollbar-track]:h-[90%]`}
          ref={ref}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default PopOver;
