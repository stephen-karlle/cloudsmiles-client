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
  selectedSection,
  setSelectedSection  
} : AddSectionTreatmentsSheetProps) => {

  const step = 1
  const setStep = () => {}
  const isFinal = false

  const setViewActiveSheets =  useViewAppointmentStore((state) => state.setViewActiveSheets)
  const { control, watch , trigger, getValues } = useFormContext()


  const sectionCheckups = watch("sectionCheckup") as SectionCheckupType[] 
  const tempIndex = sectionCheckups.findIndex((checkup) => checkup.sectionName === selectedSection.id)
  const checkupIndex = tempIndex === -1 ? 0 : tempIndex
  const sectionTreatmentPlans = watch(`sectionCheckup.${checkupIndex}.sectionTreatmentPlans`) as SectionTreatmentPlansType[]

  const { remove: removeSectionCheckup, } = useFieldArray({
    control, 
    name: "sectionCheckup", 
  });  

  const { append: appendTreatmentPlan, remove: removeTreatmentPlan} = useFieldArray({
    control, 
    name: `sectionCheckup.${checkupIndex}.sectionTreatmentPlans`, 
  });  
  
  const handleAddMoreTreatment = () => {
    appendTreatmentPlan({
      sectionCondition: "",
      sectionStatus: "",
      sectionTreatmentId: "",
    });
  };
  
  const cleanInvalidTreatmentPlans = async () => {
    const invalidIndexes: number[] = [];

    // Loop through each tooth checkup and validate its treatment plans
   for (let index = 0; index < sectionCheckups.length; index++) {
      if (sectionCheckups[index].sectionTreatmentPlans.length === 0) {
        invalidIndexes.push(index);
        removeSectionCheckup(index);
      }
    }

    setTimeout(() => {
      invalidIndexes.forEach(index => {
        removeSectionCheckup(index);
        
      });
      setSelectedSection(null);

    }, 370); 
  };

  const handleClose = async () => {
    const invalidIndexes: number[] = [];
    // Check if treatment plans are valid
    for (let i = 0; i < sectionTreatmentPlans.length; i++) {
      const isValid = await trigger(`sectionCheckup.${checkupIndex}.sectionTreatmentPlans.${i}`);
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

  const { data: treatments, isLoading } = useQuery({
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
    const isValid = await trigger([`sectionCheckup.${checkupIndex}.sectionTreatmentPlans`]);
    if (isValid) {
      setViewActiveSheets((prev) => 
        prev.filter(sheet => sheet.name !== "ExtraSheet2")
      );
      return;
    }
  }

  const treatmentConstants = treatments ? treatments.map(treatment => ({
    id: treatment._id,
    name: treatment.treatmentName,
  }) ) : []

  console.log(getValues())

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
                filteredTreatmentConstants={treatmentConstants}
                treatmentConstants={treatmentConstants}
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
