import { ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion";
import { useFocusTrap } from "@mantine/hooks"

export interface ISheet {
  name: string;
  component: ReactNode;
}

export interface IActiveSheet {
  name: string;
  component: ReactNode;
}

interface IPanel{
  children: ReactNode;
}

interface IDrawer {
  mainSheet: ISheet;
  isOpen: boolean;
  activeSheets: IActiveSheet[];
  sideBar?: boolean;
}

const Sheet = ({ children }: IPanel ) => {
  const focusTrap= useFocusTrap();
  return (
    <div 
      className="bg-white rounded-3xl h-full"
      ref={focusTrap}
    >
      {children}
    </div>
  );
}

const Cover = () => {
  return (
    <div className="w-full h-full absolute z-50 bg-black/0 top-0" />
  )
}


const Drawer= ({
  mainSheet,
  isOpen,
  activeSheets,
}: IDrawer) => {


  const generatePositionX = (activeSheets: number): string => {
    const position = activeSheets > 0 ? 20 + (activeSheets - 1) * 30 : 0;
    return `${position}%`;
  }

  const positionX = generatePositionX(activeSheets.length)

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.main
          className={`h-screen w-screen fixed top-0 right-0 bottom-0 left-0 z-[110]`}          
          layout
        >
          {/* The backdrop */}
          <motion.article 
            className={`h-screen w-screen bg-black/40 backdrop-blur-sm fixed z-[120]`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          /> 
            {/* The drawer */}
            <motion.article 
              className={`h-screen w-screen fixed z-[140]`}
              layout
            >
              {/* The   */}
              <motion.section 
                className="w-full h-full flex items-center justify-end gap-2"
                animate={{ x: positionX }}
                transition={{ duration: 0.30, ease: "easeOut"}}
              > 
                <motion.div 
                  className="w-full h-full flex flex-row-reverse justify-start gap-6 py-8 pr-4"
                >
                  <AnimatePresence>
                    {activeSheets.map((sheet, index) => {
                      const isLast = index === activeSheets.length - 1;
                      return (
                        <motion.div 
                          key={index}
                          className=" w-[30vw] h-full z-40 flex-shrink-0 "
                          transition={{ duration: index > 0 ? 0.45 : 0.30,  ease: "easeOut" }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Sheet>
                            {sheet.component}
                            {!isLast && <Cover />}
                          </Sheet>
                        </motion.div>
                      )
                    })}
                  </AnimatePresence>
                </motion.div>

                <motion.div 
                  className=" w-[30vw] flex-shrink-0 h-full py-8 pr-4 relative "
                  initial={{ x: "100%" }}
                  animate={{ x: "0%" }}
                  exit={{ x: "100%" }}
                  transition={{ duration: 0.30 , ease: "easeInOut" }}
                >
                  <Sheet>
                    {mainSheet.component}
                    {activeSheets.length !== 0 && <Cover />}
                  </Sheet>
                </motion.div>

              </motion.section>
            </motion.article>
        </motion.main>
      )}
    </AnimatePresence>
  )
}

export default Drawer
