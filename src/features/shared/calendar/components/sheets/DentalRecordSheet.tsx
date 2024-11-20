import { FormProvider } from "react-hook-form";
import { useViewAppointmentStore } from "../../stores/appointment.stores";
import { MouseEvent, useState } from "react";
import Button from "@components/ui/Button";
import ArrowIcon from "@icons/linear/ArrowIcon";
import CloseIcon from "@icons/linear/CloseIcon";

import ToothPlusIcon from "@icons/linear/ToothPlusIcon";
import FilePlusIcon from "@icons/linear/FilePlusIcon";
import Stepper from "@components/ui/Stepper";

import MedicalDataStep from "../steps/dental_record/MedicalDataStep";
import OralHygieneStep from "../steps/dental_record/OralHygieneStep";
import DentalDataStep from "../steps/dental_record/DentalDataStep";
import useAddDentalRecord from "../../hooks/useAddDentalRecord";



const DentalRecordSheet = () => {
  const setViewActiveSheets = useViewAppointmentStore((state) => state.setViewActiveSheets)
  const isLoading = useViewAppointmentStore((state) => state.isLoading);

  const [ step, setStep ] = useState(1)

  const stepsConstants = [
    { icon: FilePlusIcon, title: "Tooth Data" },
    { icon: ToothPlusIcon, title: "Oral Record" },
    { icon: FilePlusIcon, title: "Oral Hygiene" },
  ];


  const isFinal = step === 3
  const methods = useAddDentalRecord()
  const { handleSubmit, onSubmit} = methods

  const handleNextStep = (e: MouseEvent) => {
    e.preventDefault()

    if (isFinal) {
      handleSubmit(onSubmit)(); // Call handleSubmit directly
    } else {
      setStep((prev) => prev + 1);
    }
  }


  const handleClose = () => {
    setViewActiveSheets((prev) => prev.filter(sheet => sheet.name !== "ExtraSheet1"))
  }

  return (
    <FormProvider {...methods}>
      <article className="flex flex-col  w-full h-full">
        <section className="flex justify-between border-b border-gray-200 px-6 py-4">
          <h1 className="text-xl font-medium text-gray-700">Edit Tooth Record</h1>
          <button className="w-8 h-8" onClick={handleClose} type="button">
            <CloseIcon className="stroke-1 stroke-gray-500 w-full h-full" />
          </button> 
        </section>
        <section className="mt-6 mb-4 mx-4">            
          <Stepper
            steps={stepsConstants}
            step={step}
            setStep={setStep}
          />
        </section>
        <section className="overflow-y-scroll px-6 py-4 h-full overflow-x-hidden">
          { step === 1 && <MedicalDataStep /> }
          { step === 2 && <DentalDataStep /> }
          { step === 3 && <OralHygieneStep /> }
        </section>
        <section className="p-4 border-t border-gray-200 ">
          <div className="h-12 flex items-center justify-end gap-4 w-full px-6 ">
            <button className="w-auto py-2 text-gray-500 ring-1 ring-gray-200 px-6 h-10 rounded-md hover:bg-gray-100 transition-colors duration-300  ease-in" type="button" onClick={handleClose}>Close</button>
            { step > 1 &&
            <div className="flex items-center justify-center gap-4">
              <div className="h-6 w-[1px] bg-gray-200" />
              <button className="h-10 ring-1 ring-gray-200 rounded-md px-4 text-base text-gray-500 hover:bg-gray-100 transition-colors duration-300  ease-in" type="button" onClick={()=>setStep(step - 1)}>Previous</button>
            </div>
            }

            <Button 
              className="group w-24 flex items-center justify-center hover:animate-[width] duration-300 ease-in-out" 
              type="button"
              onClick={(e)=>handleNextStep(e)}
              variant={isLoading ? "disabled" : "primary"}
              disabled={isLoading}
            >            
              <div className="w-12 flex items-center justify-center transition-all duration-300 group group-hover:w-24">
                <p className="w-full text-center">{isFinal ? "Save" : "Next"}</p>
                <ArrowIcon className={`stroke-2 stroke-white h-6 -rotate-90 transition-all duration-300 opacity-0 group-hover:opacity-100 w-0 ${isFinal ? " group-hover:w-0 ": " group-hover:w-6 "}`} />
              </div>
            </Button>
          </div>
        </section>
      </article>
    </FormProvider>
  )
}

export default DentalRecordSheet

