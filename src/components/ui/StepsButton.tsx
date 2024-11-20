import CheckIcon from "@icons/linear/CheckIcon";
import { FC, ReactNode } from "react";


interface IStepsButton {
  index: number;
  step: number;
  setStep: (step: number) => void;
  icon: ReactNode;
  title: string;
  length: number;
}


const StepsButton: FC<IStepsButton> = ({index, step, setStep, icon, title, length}) => {
  const isActive = step === index;
  const isChecked = step > index;
  const isNotActive = step < index;
  


  return (
    <article className="h-24 flex items-center justify-center">
      <section className="flex flex-col gap-2 items-center justify-center flex-shrink-0 w-32">
        <button 
          className={`rounded-full w-9 h-9 relative p-[3px] transition-opacity ease-in duration-300
            ${isActive && "border-dashed border border-green-950"}
            ${isChecked && "bg-lime-500 ring-1 ring-lime-500"}
            ${isNotActive && "ring-gray-200 ring-1"}
          `} 
          type="button"
          onClick={()=>setStep(index)}
          disabled={isNotActive}
        >
          <div 
            className={`w-full h-full flex items-center justify-center rounded-full transition-all duration-200 ease-in-out
              ${isActive && " bg-green-950 "}
              ${isChecked && "bg-lime-500 p-1"}
              ${isNotActive && "bg-white-500 p-1"}
              ${index === 1 ?" p-[5px] " : " p-1 "}
            `}
          >
            {step < index + 1 ? icon  :  <CheckIcon className={`stroke-2 stroke-white w-6 h-6`} /> }
          </div>
        </button>
        <div className="flex flex-col items-center justify-center w-full">
          <p className="text-gray-500 text-xs w-full text-center">{"STEP "+index}</p>
          <p className="text-rgay-700 text-sm font-medium text-center w-full">{title}</p>
        </div>
      </section>
      { index !== length &&
        <section className="h-full w-1 flex items-start justify-center relative">
          <div className="h-1 w-12 rounded-full bg-gray-200 mt-6 absolute ">
            <div 
              className={`absolute rounded-l-full h-1 transition-[width] ease-out duration-300 
                ${isActive && "delay-[230ms]"}
                ${isActive && " bg-green-950 w-[50%]"}
                ${isChecked && "bg-lime-500 w-[100%]"}
                ${isNotActive && "bg-white w-[0%]"}
              `} 
            />
          </div>
        </section>
      }
    </article>
  )
}

export default StepsButton