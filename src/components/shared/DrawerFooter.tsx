import Button from '@components/ui/Button'
import ArrowIcon from '@icons/linear/ArrowIcon'
import { Fragment } from 'react/jsx-runtime';

interface IDrawerFooter {
  handleClose: () => void;
  handleSubmit: (e: any) => void;
  step?: number;
  setStep?: (step: number) => void;
  isLoading?: boolean;
  isFinal?: boolean;
  type?: "form" | "sheet";
}


const DrawerFooter = ({ 
    handleClose,
    handleSubmit,
    step,
    setStep,
    isLoading,
    isFinal,
    type = "form"
  }: IDrawerFooter ) => {


  return (
    <Fragment>
      {type === "form" ? (
        <section className="p-4 border-t border-gray-200 ">
          <div className="h-12 flex items-center justify-end gap-4 w-full px-6 ">
            <Button                   
              variant={isLoading ? "disabled" : "secondary"}
              onClick={handleClose}
              disabled={isLoading}
            >
              Close
            </Button>
            { step && step > 1 &&
              <div className="flex items-center justify-center gap-4">
                <div className="h-6 w-[1px] bg-gray-200" />
                <Button 
                  variant={isLoading ? "disabled" : "secondary"}
                  onClick={setStep ? ()=>setStep(step - 1) : () => {}}
                  disabled={isLoading}
                >
                  Previous
                </Button>
              </div>
            }
            <Button 
              className="group w-24 flex items-center justify-center hover:animate-[width] duration-300 ease-in-out" 
              variant={isLoading ? "disabled" : "primary"}
              type={isFinal ? "submit":"button"} 
              onClick={isFinal ? ()=>{} : (e)=>handleSubmit(e)}
              disabled={isLoading}
            >            
              <div className="w-12 flex items-center justify-center transition-all duration-300 group group-hover:w-24">
                <p className="w-full text-center">{isFinal ? "Save" : "Next"}</p>
                <ArrowIcon className={`stroke-2 stroke-white h-6 -rotate-90 transition-all duration-300 opacity-0 group-hover:opacity-100 w-0 ${isFinal ? " group-hover:w-0 ": " group-hover:w-6 "}`} />
              </div>
            </Button>
          </div>
        </section>
      ) : (
        <section className="p-4 border-t border-gray-200 ">
          <div className="h-12 flex items-center justify-end gap-4 w-full px-6 ">
            <Button                   
              variant="secondary"
              onClick={handleClose}
            >
              Close
            </Button>
            <Button 
              onClick={handleSubmit}
              className="group w-24 flex items-center justify-center hover:animate-[width] duration-300 ease-in-out" 
              variant="primary"
            >            
              <div className="w-12 flex items-center justify-center transition-all duration-300 group group-hover:w-24">
                <p className="w-full text-center">Save</p>
                <ArrowIcon className={`stroke-2 stroke-white h-6 -rotate-90 transition-all duration-300 opacity-0 group-hover:opacity-100 w-0 group-hover:w-0 `} />
              </div>
            </Button>
          </div>
        </section>
      )}

    </Fragment>
  )
}

export default DrawerFooter
