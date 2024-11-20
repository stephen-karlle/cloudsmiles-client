import { useFieldArray, useFormContext } from 'react-hook-form';
import { ITreatmentVisitationCard } from '../../types/treatment.types';
import { durationOptionList } from '../../constants/treatment.constants';
import Input from '@components/ui/Input';
import TextArea from '@components/ui/TextArea';
import ArrowIcon from '@icons/linear/ArrowIcon'
import ComboBox from '@components/ui/ComboBox';
import DeleteIcon from '@icons/linear/DeleteIcon';

const TreatmentVisitationCard = ({
  index,
}: ITreatmentVisitationCard   ) => {

  const { control, getValues} = useFormContext()

  const { remove } = useFieldArray({
    control, 
    name: "treatmentVisits", 
  });  

  const handleRemoveVisit = () => {
    remove(index)
  }


  const treatmentVisits = getValues('treatmentVisits')
  const length = treatmentVisits.length
  const isLast = index === length - 1
  
  return (
    <main className="flex flex-col gap-12">
      <article className="flex items-start gap-4 ">
        <section className="w-fit flex flex-col gap-4 ">
          <button type="button" className="rounded-full w-8 h-8 ring-1 ring-lime-500 flex items-center justify-center">
            <ArrowIcon className="stroke-2 stroke-lime-500 w-6 h-6 rotate-180" />
          </button>
          <button type="button" className="rounded-full w-8 h-8 ring-1 ring-lime-500 flex items-center justify-center">
            <ArrowIcon className="stroke-2 stroke-lime-500 w-6 h-6" />
          </button>
        </section>
        <section className="flex flex-col ring-1 ring-gray-200 rounded-md w-full">
          <header className="flex items-center justify-between w-full p-4 bg-gray-50 border-b border-gray-200 rounded-t-lg">
            <h1 className="text-lg text-gray-700 font-medium">Visit #{index + 1}</h1>
            {index !== 0 && 
              <button
                className="flex-shrink-0"
                type="button"
                onClick={handleRemoveVisit}
              >
                <DeleteIcon className="w-5 h-5 stroke-2 stroke-rose-500" />
              </button>
            }
          </header>
          <div className="p-4 flex flex-col"> 
            <label className="text-sm font-medium text-gray-500 tracking-tight">Treatment Name</label>
            <Input
              type="text"
              className="h-10 w-full mt-2 flex-shrink-0" 
              placeholder="Dental Checkup"
            />

            <label className="text-sm font-medium text-gray-500 tracking-tight mt-6">Estimate Treatment Duration</label>
            <ComboBox
              className="mt-2"
              placeholder="duration"
              options={durationOptionList}
              setValue={()=>{}}
            />
            <label className="text-sm font-medium text-gray-500 tracking-tight mt-6">Treatment Description</label>
            <TextArea
              className="h-10 w-full mt-2 flex-shrink-0" 
              placeholder="Type a description..."
            />

            <div className="mt-6 rounded-md bg-gray-50 flex items-center justify-between p-4">
              <div className="flex flex-col ">
                <label className="text-base text-gray-700 font-medium">Component Used</label>
                <p className="text-sm text-gray-500">Customize all components used for the patient treatment.</p>
              </div>
              <button
                type="button"
                className="text-base text-lime-500 w-12"
              >
                Setup
              </button>
            </div>  
          </div>
        </section>
      </article>
      {!isLast  &&
        <article
          className=" h-[1px] w-full bg-gray-200 relative flex items-center justify-end"
        >
          <div className='flex items-center justify-center w-[90%]'>
          </div>
        </article>
      }
    </main>
  )
}

export default TreatmentVisitationCard
