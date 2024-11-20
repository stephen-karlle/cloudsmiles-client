import { useFormContext } from "react-hook-form";
import { useViewAppointmentStore } from "../../stores/appointment.stores";
import { MouseEvent, useState } from "react";
import Stepper from "@components/ui/Stepper";
import FilePlusIcon from "@icons/linear/FilePlusIcon";
import TreatmentPlanStep from "../steps/dental_checkup/TreatmentPlanStep";
import AgreementDocumentsStep from "../steps/dental_checkup/AgreementDocumentsStep";
import ToothPlusIcon from "@icons/linear/ToothPlusIcon";
import DrawerHeader from "@components/shared/DrawerHeader";
import DrawerFooter from "@components/shared/DrawerFooter";

const stepsConstants = [
  { icon: ToothPlusIcon, title: "Treatment Plan" },
  { icon: FilePlusIcon, title: "Agreement Files" },
];


const DentalCheckupSheet = () => {

  const setViewActiveSheets = useViewAppointmentStore((state) => state.setViewActiveSheets)
  const isLoading = useViewAppointmentStore((state) => state.isLoading)

  const [ step, setStep ] = useState(1)
  const isFinal = step === 2

  
  const { trigger, watch } = useFormContext()
  

  const validateDentalCheckup = async () => {
    const isDentalCheckupValid = await trigger([
      "checkupData.generalCheckup",
      "checkupData.sectionCheckup",
      "checkupData.toothCheckup",
      "checkupData"
    ]);
    return isDentalCheckupValid;
  };




  const handleNextStep = async (e: MouseEvent) => {
    e.preventDefault();
    let isValid: boolean = false;
    switch (step) {
      case 1:
        isValid = await validateDentalCheckup();
        break;
      default:
        break;
    }
    
    if (isValid) {
      setStep(step + 1);
      return;
    }

  }


  const handleClose = () => {
    setViewActiveSheets((prev) => prev.filter(sheet => sheet.name !== "ExtraSheet1"))
    // queryClient.refetchQueries({ queryKey: ["appointmentCheckupData"] });
  }


  console.log(watch("checkupData"))


  return (
    <article className="flex flex-col w-full h-full">
      <DrawerHeader 
        title="Add Dental Checkup"  
        handleClose={handleClose}
        isLoading={isLoading}
      />
      <section className="mt-6 mb-4 mx-4">            
        <Stepper
          steps={stepsConstants}
          step={step}
          setStep={setStep}
        />
      </section>
      <section className="overflow-x-hidden h-full">
        { step === 1 && <TreatmentPlanStep /> } 
        { step === 2 && <AgreementDocumentsStep /> }
      </section>
      <DrawerFooter 
        step={step}
        setStep={setStep}
        handleSubmit={handleNextStep}
        handleClose={handleClose}
        isFinal={isFinal}
        isLoading={isLoading}
      />
    </article>
  )
}

export default DentalCheckupSheet