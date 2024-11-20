import { Controller, useFormContext } from 'react-hook-form'
import { dentalQuestionnairesConstants } from '@features/shared/calendar/constants/conditions.constants'
import RadioGroup from '@components/ui/RadioGroup'
import TextArea from '@components/ui/TextArea'

const DentalDataStep = () => {


  const { control } = useFormContext()


  return (
    <article className="flex flex-col w-full gap-6">
      {dentalQuestionnairesConstants.map((question, index) => (
        <section 
          className="flex flex-col gap-2"
          key={index}
        >
          <label className="text-sm text-gray-700 ">{question.question}</label>
          <Controller 
            name={`recordOralData.${question._id}`}
            control={control}
            render={({ field: { value, onChange} }) => (
              <RadioGroup 
                checked={value}
                onChange={onChange}
                choices={question.choices}
              />
            )}
          />
        </section>
      ))}


      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-700">Anomolous Teeth</label>
        <Controller 
          name="recordOralData.anomalousTeeth"
          control={control}
          render={({ field: { value, onChange} }) => (
            <TextArea 
              placeholder="List any anomalous teeth."
              value={value}
              onChange={onChange}
            />
          )}
        />
      </div>
      <div className=" flex flex-col gap-2">
        <label className="text-sm text-gray-700">Other</label>
        <Controller 
          name="recordOralData.other"
          control={control}
          render={({ field: { value, onChange} }) => (
            <TextArea 
              placeholder="List any anomalous teeth."
              value={value}
              onChange={onChange}
            />
          )}
        />
      </div>

    </article>
  )
}

export default DentalDataStep