import { useViewAppointmentStore } from '../../stores/appointment.stores'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { ToothCheckupType, ToothTreatmentPlansType } from '../../types/appointment.types'
import { useQuery } from '@tanstack/react-query'
import { getTreatments } from '../../services/treatment.services'
import { SelectedToothType } from '../../types/store.types'
import DrawerFooter from '@components/shared/DrawerFooter'
import DrawerHeader from '@components/shared/DrawerHeader'
import Button from '@components/ui/Button'
import ToothTreatmentPlanCard from '../cards/ToothTreatmentPlanCard'
import PlusIcon from '@icons/linear/PlusIcon'


type AddToothTreatmentsSheetProps = {
  selectedTooth: SelectedToothType
  setSelectedTooth: (tooth: SelectedToothType | null) => void
}

const AddToothTreatmentsSheet = ({ 
  selectedTooth ,
  setSelectedTooth  
} : AddToothTreatmentsSheetProps) => {

  const step = 1
  const setStep = () => {}
  const isFinal = false

  const setViewActiveSheets =  useViewAppointmentStore((state) => state.setViewActiveSheets)
  const { control, watch , trigger} = useFormContext()


  const toothCheckups = watch("checkupData.toothCheckup") as ToothCheckupType[] 
  const tempIndex = toothCheckups.findIndex((checkup) => checkup.toothNumber === selectedTooth.id)
  const checkupIndex = tempIndex === -1 ? 0 : tempIndex
  const toothTreatmentPlans = watch(`checkupData.toothCheckup.${checkupIndex}.toothTreatmentPlans`) as ToothTreatmentPlansType[]
  const { remove: removeToothCheckup, } = useFieldArray({
    control, 
    name: "checkupData.toothCheckup", 
  });  

  const { append: appendTreatmentPlan, remove: removeTreatmentPlan} = useFieldArray({
    control, 
    name: `checkupData.toothCheckup.${checkupIndex}.toothTreatmentPlans`, 
  });  
  

  const handleAddMoreTreatment = () => {
    appendTreatmentPlan({
      toothCondition: "",
      toothStatus: "",
      toothTreatmentId: "",
    });
  };
  
  const cleanInvalidTreatmentPlans = () => {
    const invalidIndexes = toothCheckups
    .map((checkup, index) => (checkup.toothTreatmentPlans.length === 0 ? index : -1))
      .filter(index => index !== -1);

    setTimeout(() => {
      for (let i = invalidIndexes.length - 1; i >= 0; i--) {
        removeToothCheckup(invalidIndexes[i]);
      }
      setSelectedTooth(null);

    }, 370); 
  };
  
  const handleClose = async () => {
    const invalidIndexes: number[] = [];
    // Check if treatment plans are valid
    for (let i = 0; i < toothTreatmentPlans.length; i++) {
      const isValid = await trigger(`checkupData.toothCheckup.${checkupIndex}.toothTreatmentPlans.${i}`);
      if (!isValid) {
        invalidIndexes.push(i);
      }
    }
    // Remove invalid indexes
    for (let i = invalidIndexes.length - 1; i >= 0; i--) {
      removeTreatmentPlan(invalidIndexes[i]);
    }
    // Remove tooth checkup if no treatment plans
    cleanInvalidTreatmentPlans();
    // Finally close the sheet
    setViewActiveSheets((prev) => 
      prev.filter(sheet => sheet.name !== "ExtraSheet2")
    );
  }


  const { data: treatmentConstants, isLoading } = useQuery({
    queryKey: ['treatmentToothDataItems'],
    queryFn: async () => {
      try {
        const response = await getTreatments("Tooth");
        return response 
      } catch (error) {
        console.log(error)
      }
    },
  });



  const handleSubmit = async () => {
    cleanInvalidTreatmentPlans();
    const isValid = await trigger([`checkupData.toothCheckup.${checkupIndex}.toothTreatmentPlans`]);
    if (isValid) {
      setViewActiveSheets((prev) => 
        prev.filter(sheet => sheet.name !== "ExtraSheet2")
      );
      return;
    }
  }
  
  const filteredTreatmentConstants = treatmentConstants ? treatmentConstants.filter(treatment => {
    const isExist = toothTreatmentPlans && toothTreatmentPlans.find(treatmentPlan => treatmentPlan.toothTreatmentId === treatment._id)
    return !isExist
  }) .map(treatment => ({
    id: treatment._id,
    name: treatment.treatmentName,
  })) : []

  return (
    <article className="flex flex-col w-full h-full ">
      <DrawerHeader 
        title={`Add Treatments to ${selectedTooth.name}`}  
        handleClose={handleClose}
        isLoading={false}
      />
      <section 
        className="overflow-y-auto h-full overflow-x-hidden outline-none pt-4 px-6"
        style={{ scrollbarGutter: 'stable' }}
      >
        <div className="flex items-center justify-between w-full mt-2">
          <label className="text-lg font-medium text-gray-700 tracking-tight ">Treatments added</label>
          <Button 
            variant="secondary"
            className="flex items-center justify-center  text-sm h-8 text-lime-500"
            onClick={handleAddMoreTreatment}
            disabled={isLoading}
          >
            <PlusIcon className="w-5 h-5 stroke-2 stroke-lime-500" />
            Add Tooth Treatment
          </Button>
        </div>
        {toothTreatmentPlans?.length > 0 ? (
          <div className="flex flex-col my-8 gap-6">
            {toothTreatmentPlans.map((_, index) => (
              <ToothTreatmentPlanCard 
                key={index}
                index={index}
                checkupIndex={checkupIndex}
                filteredTreatmentConstants={filteredTreatmentConstants}
                treatmentConstants={(treatmentConstants ?? []).map(treatment => ({
                  id: treatment._id,
                  name: treatment.treatmentName,
                }))}              
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm"></p>
        )}
      </section>
      <DrawerFooter 
        step={step}
        setStep={setStep}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        isFinal={isFinal}
        isLoading={false}
      />
    </article>
  )
}

export default AddToothTreatmentsSheet
