import { ITreatmentComponentCard } from "../../types/treatment.types"
import AmountInput from "@components/ui/AmountInput"
import ErrorMessage from "@components/ui/ErrorMessage"
import RadioButton from "@components/ui/RadioButton"
import SelectionBox from "@components/ui/SelectionBox"
import UnitInput from "@components/ui/UnitInput"
import CloseIcon from "@icons/linear/CloseIcon"
import { Controller, useFieldArray, useFormContext } from "react-hook-form"
import { Fragment } from "react/jsx-runtime"

const TreatmentComponentCard = ({
  componentsOptionList,
  index,
}: ITreatmentComponentCard) => {
  
  const { 
    control, 
    getValues, 
    formState: { errors },  
    clearErrors,
  } = useFormContext()  
  
  const { remove } = useFieldArray({
    control, 
    name: "treatmentComponents", 
  });

  const handleRemoveComponent = () => {
    remove(index)
  }

  const error = Array.isArray(errors.treatmentComponents) ? errors.treatmentComponents[index] : undefined;

  return (
    <article
      className="flex flex-col gap-6 w-full ring-1 ring-gray-200 rounded-md  "
    >
      <section className="h-12 border-b border-gray-200 rounded-t-md bg-gray-50 px-4 flex items-center justify-between">
        <h1 className="text-lg font-medium tracking-tight text-gray-700">Component #{index + 1}</h1>      
        <button
          className="flex items-center justify-center w-8 h-8 "
          type="button"
          onClick={handleRemoveComponent}
        >
          <CloseIcon className="w-6 h-6 stroke-2 stroke-rose-500" />
        </button>
      </section>
      <Controller
        name={`treatmentComponents.${index}`}
        control={control}
        defaultValue={{
          componentProductId: "",
          componentName: "",
          componentAmount: "",
          isComponentFree: "",
        }}
        render={({ field: { onChange, value} }) => (
          <Fragment>
            <section className="flex w-full items-start justify-between gap-4 px-6">
              <div className="flex flex-col w-full gap-2">
                <label className="text-sm font-medium text-gray-500 tracking-tight">Component Name</label>
                <SelectionBox 
                  className="w-full h-10"
                  options={componentsOptionList}
                  placeholder="component"
                  didError={!!error?.componentName?.message}
                  setValue={(selectedValue) => {
                    onChange({
                      ...value, 
                      componentProductId: selectedValue.id, 
                      componentName: selectedValue.name 
                    });
                    clearErrors(`treatmentComponents.${index}.componentName`);
                  }}
                  value={value.componentName} 
                />
                <ErrorMessage message={error?.componentName?.message} />
              </div>
              <div className="flex flex-col w-full gap-2">
                <label className="text-sm font-medium text-gray-500 tracking-tight">Amount</label>
                <AmountInput 
                  className="w-full h-10"
                  size="md"
                  maxLength={5}
                  didError={!!error?.componentAmount?.message}
                  onChange={(e) => {
                    onChange({
                      ...value, 
                      componentAmount: e.target.value, 
                    });
                    clearErrors(`treatmentComponents.${index}.componentAmount`);
                  }}
                  value={value.componentAmount} 
                />
                <ErrorMessage message={error?.componentAmount?.message} />
              </div>
            </section>
            <section className="flex flex-col items-start justify-start gap-2 px-6 pb-4">
              <label className="text-sm font-medium text-gray-500 tracking-tight">Availability</label>
              <div className="flex items-center justify-start gap-2" >
                <RadioButton 
                  className="h-10 w-16" 
                  value="Free"
                  checked={value.isComponentFree === "free"}
                  didError={!!error?.isComponentFree?.message}
                  setChecked={() => {
                    onChange({
                      ...value, 
                      isComponentFree: "free", 
                      componentFreeAmount: "",
                    });
                    clearErrors(`treatmentComponents.${index}.isComponentFree`);
                    clearErrors(`treatmentComponents.${index}.componentFreeAmount`);
                  }}     
                  outline={false}
                />
                <RadioButton 
                  className="h-10 w-24" 
                  didError={!!error?.isComponentFree?.message}
                  value="Free up to"
                  checked={value.isComponentFree === "freeUpTo"}
                  setChecked={() => {
                    onChange({
                      ...value, 
                      isComponentFree: "freeUpTo", 
                    });
                    clearErrors(`treatmentComponents.${index}.componentFreeAmount`);
                    clearErrors(`treatmentComponents.${index}.isComponentFree`);
                  }}              
                  outline={false}
                />
                { getValues(`treatmentComponents.${index}.isComponentFree`) === "freeUpTo" &&
                  <UnitInput 
                    className="w-24 h-10"
                    unit="pcs"
                    maxLength={4}
                    onChange={(e)=>{
                      onChange({
                        ...value, 
                        componentFreeAmount: e.target.value, 
                      });
                      clearErrors(`treatmentComponents.${index}.componentFreeAmount`);
                      clearErrors(`treatmentComponents.${index}.isComponentFree`);
                    }}
                    didError={!!error?.componentFreeAmount?.message}
                    value={value?.componentFreeAmount || ""}
                  /> 
                }
              </div>
              <ErrorMessage message={error?.componentFreeAmount?.message} />
            </section>
            
          </Fragment>
        )}
      />   
    </article>
  )
}

export default TreatmentComponentCard