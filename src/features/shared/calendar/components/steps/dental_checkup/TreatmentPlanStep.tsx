import { useState } from "react";
import { motion } from 'framer-motion';
import GeneralServiceStep from "./substep/GeneralServiceStep";
import InformationIcon from "@icons/linear/InformationIcon";
import ToothServiceStep from "./substep/ToothServiceStep";
import SectionServiceStep from "./substep/SectionServiceStep";

const TreatmentPlanStep = () => {
  const [ activeStep , setActiveStep ] = useState<"tooth" | "section" | "general">("tooth");


  return (
    <section className="flex items-center justify-start gap-6 flex-col h-full ">
      <div className="relative flex items-center justify-center bg-gray-50  w-fit rounded-md p-1 h-8 flex-shrink-0 ">
        <motion.div
          className="absolute w-20 h-7 bg-white rounded-md shadow-md shadow-gray-200"
          initial={false}
          animate={{ x: activeStep === "tooth" ? -82 : activeStep === "section" ? "0%" : "101%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
        <button
          className={` z-10 min-w-20 h-full text-sm transition-all duration-300 ease-in-out 
            ${activeStep === "tooth" ? "text-lg " : "text-gray-500 font-normal "}`
          }
          onClick={() => setActiveStep("tooth")}
          type="button"
        >
          Tooth
        </button>
        <button
          className={` z-10 min-w-20 h-full text-sm transition-all duration-300 ease-in-out 
            ${activeStep === "section" ? "text-lg " : "text-gray-500 font-normal "}`
          }
          onClick={() => setActiveStep("section")}
          type="button"
        >
          Section
        </button>
        <button
          className={` z-10 min-w-20 h-full text-sm transition-all duration-300 ease-in-out 
            ${activeStep === "general" ? "text-lg " : "text-gray-500 font-normal "}`
          }
          onClick={() => setActiveStep("general")}
          type="button"
        >
          General
        </button>
      </div>

      {activeStep !== "general" && (
        <div className="flex flex-col items-center justify-center gap-1">
          {activeStep === "tooth" && 
          <div className="bg-green-50 rounded-md px-2 py-1 flex items-center justify-center gap-1 ">
            <InformationIcon className="w-5 h-5 stroke-2 stroke-white fill-green-500" />
            <label className="text-sm font-normal text-green-500 ">Click on a tooth to add a treatment.</label>
          </div>
          }          
          {activeStep === "section" && (
            <div className="bg-violet-50 rounded-md px-2 py-1 flex items-center justify-center gap-1 ">
              <InformationIcon className="w-5 h-5 stroke-2 stroke-white fill-violet-500" />
              <label className="text-sm font-normal text-violet-500 ">Select a section to add a treatment.</label>          
            </div>
          )}          
        </div>
      )}
      {activeStep === "tooth" && <ToothServiceStep />}
      {activeStep === "section" && <SectionServiceStep />}
      {activeStep === "general" && <GeneralServiceStep />}
    </section>
  );
};

export default TreatmentPlanStep;