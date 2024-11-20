import { useFocusTrap } from "@mantine/hooks";
import { AnimatePresence, motion } from "framer-motion";

interface IBackdrop {
  isOpen?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  zIndex?: number;
}

const Backdrop = ({ isOpen = false,onClose,  children, zIndex=100 }:IBackdrop
) => {
  const focusTrap = useFocusTrap()
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.main 
          ref={focusTrap}
          onClick={onClose}
          className=" flex items-center justify-center bg-black/40 backdrop-blur-sm cursor-default"
          style={{
            position: 'fixed',
            top: 0,
            zIndex: zIndex,
            left: 0,
            right: 0,
            height: '100vh',
            width: '100vw',
          }}
          initial={{ opacity: 0}}
          animate={{ opacity: 1}}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {children}
        </motion.main>
      )}
    </AnimatePresence>
  );
};

export default Backdrop;