import { Controller, useFormContext } from 'react-hook-form'
import CheckList from '@components/ui/CheckList'
import ErrorMessage from '@components/ui/ErrorMessage'

const ServicesStep = () => {

  const medicalServices = [
    "Crowns",
    "Bridges",
    "Fillings",
    "Root Canal",
    "Extractions",
  ]

  const cosmeticServices = [
    "Teeth Whitening",
    "Veneers",
    "Bonding",
    "Contouring",
    "Dental Implants",
    "Inlays and Onlays",
  ]

  const { 
    control, 
    clearErrors ,
    formState: { errors },
  } = useFormContext()


  return (
    <section className="w-full h-full flex flex-col overflow-y-scroll px-6 py-4 overflow-x-hidden outline-none gap-6">
      <div className="flex flex-col gap-1">
        <Controller
          name="dentistMedicalServices"
          control={control}
          render={({ field: { onChange, value } }) => (
            <CheckList 
              title="Tooth Services"
              itemLists={medicalServices}
              checkedItems={value} 
              setCheckedItems={
                (value: string[]) => {
                  onChange(value)
                  clearErrors('dentistMedicalServices');
                }
              }
              didError={!!errors.dentistMedicalServices?.message} 
            />
          )}
        />
        <ErrorMessage message={errors.dentistMedicalServices?.message} />
      </div>
      <div className="flex flex-col gap-1">
        <Controller
          name="dentistCosmeticServices"
          control={control}
          render={({ field: { onChange, value } }) => (
            <CheckList 
              title="Section Services"
              itemLists={cosmeticServices}
              checkedItems={value} 
              setCheckedItems={
                (value: string[]) => {
                  onChange(value)
                  clearErrors('dentistCosmeticServices');
                }
              }
              didError={!!errors.dentistCosmeticServices?.message} 
            />
          )}
        />
        <ErrorMessage message={errors.dentistCosmeticServices?.message} />
      </div>


    </section>
  )
}

export default ServicesStep
