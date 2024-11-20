import { Controller, useFieldArray, useFormContext } from "react-hook-form"
import { Fragment } from "react/jsx-runtime"
import { TreatmentMedicineCardType } from "../../types/treatment.types"
import AmountInput from "@components/ui/AmountInput"
import ErrorMessage from "@components/ui/ErrorMessage"
import RadioButton from "@components/ui/RadioButton"
import SelectionBox from "@components/ui/SelectionBox"
import UnitInput from "@components/ui/UnitInput"
import CloseIcon from "@icons/linear/CloseIcon"
import AmountUnitInput from "@components/ui/AmountUnitInput"
import CheckBoxGroup from "@components/ui/CheckBoxGroup"

const dosageTypeConstants = [
  "ml",  // milliliters
  "mg",  // milligrams
  "g",   // grams
  "mcg", // micrograms
  "L",   // liters
  "oz",  // ounces
  "tbsp",// tablespoons
  "tsp", // teaspoons
  "units",// units
  "drops",// drops
  "capsule" // capsules
];

const timeUnitConstants = [
  "hour",
  "day",
  "week",
  "month",
  "year",
]

const TreatmentMedicineCard = ({
  medicinesOptionList,
  index,
}: TreatmentMedicineCardType) => {
  

  const { 
    control, 
    getValues, 
    formState: { errors },  
    clearErrors,
  } = useFormContext()  

  const { remove } = useFieldArray({
    control, 
    name: "treatmentMedicines", 
  });  


  const handleRemoveMedicine = () => {
    remove(index)
  }

  const error = Array.isArray(errors.treatmentMedicines) ? errors.treatmentMedicines[index] : undefined;


  return (
    <article
      className="flex flex-col gap-4 w-full ring-1 ring-gray-200 rounded-md  "
    >
      <section className="h-12 border-b border-gray-200 rounded-t-md bg-gray-50 px-4 flex items-center justify-between">
        <h1 className="text-lg font-medium tracking-tight text-gray-700">Medicine #{index + 1}</h1>      
        <button
          className="flex items-center justify-center w-8 h-8 "
          type="button"
          onClick={handleRemoveMedicine}
        >
          <CloseIcon className="w-6 h-6 stroke-2 stroke-rose-500" />
        </button>
      </section>
      <Controller
        name={`treatmentMedicines.${index}`}
        control={control}
        defaultValue={{
          medicineProductId: "",
          medicineName: "",
          medicineAmount: "",
          isMedicineFree: "",
          prescriptionDosageAmount: "",
          prescriptionDosageType: "",
          prescriptionTimeDuration: "",
          prescriptionTimeUnit: "",
          prescriptionRepeatition: "",
          prescriptionTimeOfTheDay: [],
          prescriptionIntakeSchedule: [],
        }}
        render={({ field: { onChange, value} }) => (
          <Fragment>
            <section className="flex w-full items-start justify-between gap-4 px-6">
              <div className="flex flex-col w-full gap-2">
                <label className="text-sm font-medium text-gray-500 tracking-tight">Medicine Name</label>
                <SelectionBox 
                  className="w-full h-10"
                  options={medicinesOptionList}
                  placeholder="a medicine"
                  didError={!!error?.medicineName?.message}
                  setValue={(selectedValue) => {
                    onChange({
                      ...value, 
                      medicineProductId: selectedValue.id, 
                      medicineName: selectedValue.name 
                    });
                    clearErrors(`treatmentMedicines.${index}.medicineName`);
                  }}
                  value={value.medicineName} 
                />
                <ErrorMessage message={error?.medicineName?.message} />
              </div>
              <div className="flex flex-col w-full gap-2">
                <label className="text-sm font-medium text-gray-500 tracking-tight">Amount</label>
                <AmountInput 
                  className="w-full h-10"
                  size="md"
                  maxLength={5}
                  didError={!!error?.medicineAmount?.message}
                  onChange={(e) => {
                    onChange({
                      ...value, 
                      medicineAmount: e.target.value, 
                    });
                    clearErrors(`treatmentMedicines.${index}.medicineAmount`);
                  }}
                  value={value.medicineAmount} 
                />
                <ErrorMessage message={error?.medicineAmount?.message} />
              </div>
            </section>
            <section className="flex flex-col items-start justify-start gap-2 px-6 ">
              <label className="text-sm font-medium text-gray-500 tracking-tight">Availability</label>
              <div className="flex items-center justify-start gap-2" >
                <RadioButton 
                  className="h-10 w-16" 
                  value="Free"
                  checked={value.isMedicineFree === "free"}
                  didError={!!error?.isMedicineFree?.message}
                  setChecked={() => {
                    onChange({
                      ...value, 
                      isMedicineFree: "free", 
                      medicineFreeAmount: "",
                    });
                    clearErrors(`treatmentMedicines.${index}.isMedicineFree`);
                    clearErrors(`treatmentMedicines.${index}.medicineFreeAmount`);
                  }}     
                  outline={false}
                />
                <RadioButton 
                  className="h-10 w-24" 
                  didError={!!error?.isMedicineFree?.message}
                  value="Free up to"
                  checked={value.isMedicineFree === "freeUpTo"}
                  setChecked={() => {
                    onChange({
                      ...value, 
                      isMedicineFree: "freeUpTo", 
                    });
                    clearErrors(`treatmentMedicines.${index}.medicineFreeAmount`);
                    clearErrors(`treatmentMedicines.${index}.isMedicineFree`);
                  }}              
                  outline={false}
                />
                { getValues(`treatmentMedicines.${index}.isMedicineFree`) === "freeUpTo" &&
                  <UnitInput 
                    className="w-24 h-10"
                    unit="pcs"
                    maxLength={4}
                    onChange={(e)=>{
                      onChange({
                        ...value, 
                        medicineFreeAmount: e.target.value, 
                      });
                      clearErrors(`treatmentMedicines.${index}.medicineFreeAmount`);
                      clearErrors(`treatmentMedicines.${index}.isMedicineFree`);
                    }}
                    didError={!!error?.medicineFreeAmount?.message}
                    value={value?.medicineFreeAmount || ""}
                  /> 
                }
              </div>
              <ErrorMessage message={error?.isMedicineFree?.message} />
            </section>
            <section className="flex flex-col items-start justify-cemter p-6 border-t border-gray-200 gap-4">
              <h1 className="text-lg font-medium tracking-tight text-gray-700">Prescription</h1> 
              <div className="flex items-start justify-center w-full gap-4">
                <div className="flex flex-col items-start justify-start w-full ">
                  <label className="text-sm font-medium text-gray-500 tracking-tight mb-2">Dosage</label>
                  <AmountUnitInput 
                    textValue={value.prescriptionDosageAmount}
                    unitValue={value.prescriptionDosageType}
                    className=""
                    onChange={(e) => {
                      onChange({
                        ...value, 
                        prescriptionDosageAmount: e.target.value, 
                      });
                      clearErrors(`treatmentMedicines.${index}.prescriptionDosageAmount`);
                    }}
                    onSelect={(selectedValue)=> {
                      onChange({
                        ...value, 
                        prescriptionDosageType: selectedValue,
                      })
                      clearErrors(`treatmentMedicines.${index}.prescriptionDosageType`);
                    }}
                    options={dosageTypeConstants}
                    maxLength={4}
                    didTextError={!!error?.prescriptionDosageAmount?.message}
                    didUnitError={!!error?.prescriptionDosageType?.message}
                  />
                  <ErrorMessage 
                    message={
                      error?.prescriptionDosageAmount?.message ? 
                      error?.prescriptionDosageAmount?.message : 
                      error?.prescriptionDosageType?.message
                    } 
                  />
                </div> 
                <div className="flex flex-col items-start justify-start w-full ">
                  <label className="text-sm font-medium text-gray-500 tracking-tight mb-2">Time Duration</label>
                  <AmountUnitInput 
                    textValue={value.prescriptionTimeDuration}
                    unitValue={value.prescriptionTimeUnit}
                    className=""
                    onChange={(e) => {
                      onChange({
                        ...value, 
                        prescriptionTimeDuration: e.target.value, 
                      });
                      clearErrors(`treatmentMedicines.${index}.prescriptionTimeDuration`);
                    }}
                    onSelect={(selectedValue)=> {
                      onChange({
                        ...value, 
                        prescriptionTimeUnit: selectedValue,
                      })
                      clearErrors(`treatmentMedicines.${index}.prescriptionTimeUnit`);
                    }}
                    options={timeUnitConstants}
                    maxLength={4}
                    didTextError={!!error?.prescriptionTimeDuration?.message}
                    didUnitError={!!error?.prescriptionTimeUnit?.message}
                  />
                  <ErrorMessage 
                    message={
                      error?.prescriptionTimeDuration?.message ? 
                      error?.prescriptionTimeDuration?.message : 
                      error?.prescriptionTimeUnit?.message
                    } 
                  />                </div> 
              </div> 
              
              <div className="flex flex-col items-start justify-center w-full ">
                <div className="flex flex-col items-start justify-center w-full">
                  <label className="text-sm font-medium text-gray-500 tracking-tight mb-2">Repeatition</label>
                  <div className="flex items-center justify-start w-full gap-4">
                    <RadioButton 
                      className="h-10 " 
                      value="Everyday"
                      checked={value.prescriptionRepeatition === "Everyday"}
                      didError={!!error?.prescriptionRepeatition?.message}
                      setChecked={() => {
                        onChange({
                          ...value, 
                          prescriptionRepeatition: "Everyday", 
                        });
                        clearErrors(`treatmentMedicines.${index}.prescriptionRepeatition`);
                      }}     
                      outline={false}
                    />
                    <RadioButton 
                      className="h-10 " 
                      didError={!!error?.prescriptionRepeatition?.message}
                      value="Alternate Days"
                      checked={value.prescriptionRepeatition === "Alternate Days"}
                      setChecked={() => {
                        onChange({
                          ...value, 
                          prescriptionRepeatition: "Alternate Days", 
                        });
                        clearErrors(`treatmentMedicines.${index}.prescriptionRepeatition`);
                      }}
                      outline={false}
                    />
                  </div>
                  <ErrorMessage message={error?.prescriptionRepeatition?.message} />

                </div>

              </div>
                
              <div className="flex flex-col items-start justify-center w-full ">
                <label className="text-sm font-medium text-gray-500 tracking-tight mb-2">Time of the day</label>
                <div className="flex items-center justify-start w-full gap-4">
                  <CheckBoxGroup 
                    options={["Morning", "Afternoon", "Evening", "Night"]}
                    className="w-full"
                    didError={!!error?.prescriptionTimeOfTheDay?.message}
                    value={value.prescriptionTimeOfTheDay}
                    onChange={(selectedValue) => {
                      onChange({
                        ...value, 
                        prescriptionTimeOfTheDay: selectedValue, 
                      });
                      clearErrors(`treatmentMedicines.${index}.prescriptionTimeOfTheDay`);
                    }}
                  />
                </div>
                <ErrorMessage message={error?.prescriptionTimeOfTheDay?.message} />
              </div>
                
              <div className="flex flex-col items-start justify-center w-full ">
                <label className="text-sm font-medium text-gray-500 tracking-tight mb-2">Intake Schedule</label>
                <div className="flex items-center justify-start w-full gap-4">
                  <CheckBoxGroup 
                    options={["Before Meal", "After Meal",]}
                    className="w-full"
                    didError={!!error?.prescriptionIntakeSchedule?.message}
                    value={value.prescriptionIntakeSchedule}
                    onChange={(selectedValue) => {
                      onChange({
                        ...value, 
                        prescriptionIntakeSchedule: selectedValue, 
                      });
                      clearErrors(`treatmentMedicines.${index}.prescriptionIntakeSchedule`);
                    }}
                  />
                </div>
                <ErrorMessage message={error?.prescriptionIntakeSchedule?.message} />

              </div>
            </section>
          </Fragment>

        )}
      />   
    </article>
  )
}

export default TreatmentMedicineCard
