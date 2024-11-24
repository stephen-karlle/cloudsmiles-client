import { useFieldArray, useFormContext } from 'react-hook-form'
import { SectionCheckupType, SectionTreatmentPlansType } from '../../types/appointment.types'
import { useQuery } from '@tanstack/react-query'
import { getTreatments } from '../../services/treatment.services'
import { useViewAppointmentStore } from '../../stores/appointment.stores'
import { SelectedSectionType } from '../steps/dental_checkup/substep/SectionServiceStep'

import DrawerFooter from '@components/shared/DrawerFooter'
import DrawerHeader from '@components/shared/DrawerHeader'
import Button from '@components/ui/Button'
import PlusIcon from '@icons/linear/PlusIcon'
import SectionTreatmentPlanCard from '../cards/SectionTreatmentPlanCard'


type AddSectionTreatmentsSheetProps = {
  selectedSection: SelectedSectionType
  setSelectedSection: (tooth: SelectedSectionType | null) => void
}

const AddSectionTreatmentsSheet = ({ 
  selectedSection ,
  setSelectedSection  
} : AddSectionTreatmentsSheetProps) => {

  const step = 1
  const setStep = () => {}
  const isFinal = false

  const setViewActiveSheets =  useViewAppointmentStore((state) => state.setViewActiveSheets)
  const { control, watch , trigger } = useFormContext()


  const sectionCheckups = watch("checkupData.sectionCheckup") as SectionCheckupType[] 
  const tempIndex = sectionCheckups.findIndex((checkup) => checkup.sectionName === selectedSection.id)
  const checkupIndex = tempIndex === -1 ? 0 : tempIndex
  const sectionTreatmentPlans = watch(`checkupData.sectionCheckup.${checkupIndex}.sectionTreatmentPlans`) as SectionTreatmentPlansType[]
  const { remove: removeSectionCheckup, } = useFieldArray({
    control, 
    name: "checkupData.sectionCheckup", 
  });  

  const { append: appendTreatmentPlan, remove: removeTreatmentPlan} = useFieldArray({
    control, 
    name: `checkupData.sectionCheckup.${checkupIndex}.sectionTreatmentPlans`, 
  });  
  

  const handleAddMoreTreatment = () => {
    appendTreatmentPlan({
      sectionCondition: "",
      sectionStatus: "",
      sectionTreatmentId: "",
    });
  };
  
  const cleanInvalidTreatmentPlans = () => {
    const invalidIndexes = sectionCheckups
    .map((checkup, index) => (checkup.sectionTreatmentPlans.length === 0 ? index : -1))
      .filter(index => index !== -1);

    setTimeout(() => {
      for (let i = invalidIndexes.length - 1; i >= 0; i--) {
        removeSectionCheckup(invalidIndexes[i]);
      }
      setSelectedSection(null);
    }, 370); 
  };
  
  const handleClose = async () => {
    const invalidIndexes: number[] = [];
    // Check if treatment plans are valid
    for (let i = 0; i < sectionTreatmentPlans.length; i++) {
      const isValid = await trigger(`checkupData.sectionCheckup.${checkupIndex}.sectionTreatmentPlans.${i}`);
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
    queryKey: ['treatmentSectionDataItems'],
    queryFn: async () => {
      try {
        const response = await getTreatments("Section");
        return response 
      } catch (error) {
        console.log(error)
      }
    },
  });



  const handleSubmit = async () => {
    cleanInvalidTreatmentPlans();
    const isValid = await trigger([`checkupData.sectionCheckup.${checkupIndex}.sectionTreatmentPlans`]);
    if (isValid) {
      setViewActiveSheets((prev) => 
        prev.filter(sheet => sheet.name !== "ExtraSheet2")
      );
      return;
    }
  }

  const filteredTreatmentConstants = treatmentConstants ? treatmentConstants.filter(treatment => {
    const isExist = sectionTreatmentPlans && sectionTreatmentPlans.find(treatmentPlan => treatmentPlan.sectionTreatmentId === treatment._id)
    return !isExist
  }).map(treatment => ({
    id: treatment._id,
    name: treatment.treatmentName,
  })) : []

  return (
    <article className="flex flex-col w-full h-full">
      <DrawerHeader 
        title={`Add Treatments to ${selectedSection.id}`}  
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
            Add Section Treatment
          </Button>
        </div>
        {!isLoading && sectionTreatmentPlans?.length > 0 ? (
          <div className="flex flex-col my-8 gap-6">
            {sectionTreatmentPlans.map((_, index) => (
              <SectionTreatmentPlanCard 
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

export default AddSectionTreatmentsSheet
