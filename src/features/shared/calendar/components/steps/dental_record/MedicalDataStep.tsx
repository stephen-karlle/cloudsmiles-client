import { allergiesConstants, sicknessConstants } from '@features/shared/calendar/constants/conditions.constants'
import { Controller, useFormContext } from 'react-hook-form'
import CheckList from '@components/ui/CheckList'
import UnitInput from '@components/ui/UnitInput'

const MedicalDataStep = () => {

  const { control } = useFormContext()

  return (
    <article className="flex flex-col w-full gap-4">
      <section className="flex flex-col gap-2">
        <label className="text-sm text-gray-700">Blood Pressure</label>
        <div className="flex items-center justify-center gap-4">
          <Controller 
            name="recordBloodPressure.mm"
            control={control}
            render={({ field: { value, onChange}}) => (
              <UnitInput 
                onlyNumbers 
                unit="mm" 
                className="w-full" 
                maxLength={4} 
                placeholder="0" 
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
              />
            )}
          />
          <Controller 
            name="recordBloodPressure.hg"
            control={control}
            render={({ field: { value, onChange}}) => (
              <UnitInput 
                onlyNumbers 
                unit="mm" 
                className="w-full" 
                maxLength={4} 
                placeholder="0" 
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
              />
            )}
          />
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <label className="text-sm text-gray-700">Particular Sickness</label>
        <Controller
          name="recordSickness"
          control={control}
          render={({ field: {value , onChange} }) => (
            <CheckList 
              title='Sickness'
              itemLists={sicknessConstants} 
              checkedItems={value} 
              setCheckedItems={onChange} 
            />
          )}
        />
      </section>
      <section className="flex flex-col gap-4">
        <label className="text-sm text-gray-700">Allergies</label>
        <Controller
          name="recordAllergies"
          control={control}
          render={({ field: {value , onChange} }) => (
            <CheckList 
              title='Sickness'
              itemLists={allergiesConstants} 
              checkedItems={value} 
              setCheckedItems={onChange} 
            />
          )}
        />
      </section>
    </article>
  )
}

export default MedicalDataStep