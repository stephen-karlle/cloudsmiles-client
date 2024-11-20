import RadioGroup from '@components/ui/RadioGroup'
import { hygieneQuestionnairesConstants } from '@features/shared/calendar/constants/conditions.constants'
import { Controller, useFormContext } from 'react-hook-form'

const OralHygieneStep = () => {

  const { control} = useFormContext()


  return (
    <article className="flex flex-col w-full gap-6">
      {hygieneQuestionnairesConstants.map((question, index) => (
        <section 
          className="flex flex-col gap-2"
          key={index}
        >
          <label className="text-sm text-gray-700 ">{question.question}</label>
          <Controller 
            name={`recordHygieneData.${index + 1}`}
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
    </article>
  )
}

export default OralHygieneStep