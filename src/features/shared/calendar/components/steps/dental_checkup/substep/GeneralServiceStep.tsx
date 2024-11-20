import { GeneralCheckupType } from '@features/shared/calendar/types/appointment.types'
import { getTreatments } from '@features/shared/calendar/services/treatment.services'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import Button from '@components/ui/Button'
import PlusIcon from '@icons/linear/PlusIcon'
import GeneralTreatmentPlanCard from '../../../cards/GeneralTreatmentPlanCard'


const GeneralServiceStep = () => {

  const { control, watch  } = useFormContext()

  const { append: appendTreatmentPlan} = useFieldArray({
    control, 
    name: `checkupData.generalCheckup`,
  })

  const generalCheckups = watch("checkupData.generalCheckup") as GeneralCheckupType[] 

  const handleAddMoreTreatment = () => {
    appendTreatmentPlan({
      generalNotes: "",
      generalTreatmentId: "",
      generalStatus: "",
    })
  }

  
  const { data: treatmentConstants, isLoading } = useQuery({
    queryKey: ['treatmentGeneralDataItems'],
    queryFn: async () => {
      try {
        const response = await getTreatments("General")
        return response 
      } catch (error) {
        console.log(error)
      }
    },
  });

  
  const filteredTreatmentConstants = (treatmentConstants ?? []).map((treatment) => {
    return {
      id: treatment._id,
      name: treatment.treatmentName,
    }
  }) 

  return (
    <section 
      className="flex flex-col h-full overflow-x-hidden outline-none w-full "
    >
      <div className="flex items-center justify-between w-full mt-2 px-6 mb-6">
        <label className="text-lg font-medium text-gray-700 tracking-tight ">General Treatments</label>
        <Button 
          variant="secondary"
          className="flex items-center justify-center  text-sm h-8 text-lime-500"
          onClick={handleAddMoreTreatment}
          disabled={isLoading}
        >
          <PlusIcon className="w-5 h-5 stroke-2 stroke-lime-500" />
          Add Extra Treatment
        </Button>
      </div>
      {generalCheckups?.length > 0 ? (
        <div 
          className="flex flex-col overflow-x-hidden overflow-y-auto  pt-1 gap-6 px-6 pb-6 h-full"
          style={{scrollbarGutter: "stable"}}
        >
          {generalCheckups.map((_, index) => (
            <GeneralTreatmentPlanCard 
              key={index}
              checkupIndex={index}
              treatmentConstants={filteredTreatmentConstants}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm"></p>
      )}
    </section>
  )
}

export default GeneralServiceStep