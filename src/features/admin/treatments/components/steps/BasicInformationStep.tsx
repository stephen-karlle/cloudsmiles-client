import { ITreatmentComponent, TreatmentMedicineType } from "@features/admin/treatments/types/treatment.types";
import { durationOptionList } from "@features/admin/treatments/constants/treatment.constants";
import { Controller, useFormContext } from "react-hook-form";
import { useDrawerStore } from "@stores/drawer.store";
import ErrorMessage from "@components/ui/ErrorMessage";
import Input from "@components/ui/Input";
import RadioButton from "@components/ui/RadioButton";
import TextArea from "@components/ui/TextArea";
import PriceInput from "@components/ui/PriceInput";
import ComboBox from "@components/ui/ComboBox";
import ComponentsSheet from "../sheets/ComponentsSheet";
import MedicineSheet from "../sheets/MedicineSheet";


const BasicInformationStep = () => {

  const setActiveSheets = useDrawerStore((state) => state.setActiveSheets)

  const { 
    control, 
    formState: { errors },  
    clearErrors,
    getValues,
  } = useFormContext()


  const treatmentComponents = getValues("treatmentComponents") as ITreatmentComponent[];
  const treatmentMedicines = getValues("treatmentMedicines") as TreatmentMedicineType[];
  const treatmentChargeType = getValues("treatmentChargeType") as string;
  
  const handleOpenAddMoreComponents = () => {

    setActiveSheets(prev => [
      ...prev,
      {
        name: "ExtraSheet1", 
        component: <ComponentsSheet />
      }
    ]);

  }

  const handleOpenAddMoreMedicines = () => {
    setActiveSheets(prev => [
      ...prev,
      {
        name: "ExtraSheet1", 
        component: <MedicineSheet />
      }
    ]);
  }



  return (
    <section className="w-full h-full flex flex-col ">
      <label className="text-lg font-medium text-gray-700 tracking-tight mb-2">Treatment Information</label>
      <label className={`text-sm font-medium text-gray-500 tracking-tight`}>Name</label>
      <Controller
        name="treatmentName"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }}) => (
          <Input
            type="text"
            className="h-10 w-full mt-2 flex-shrink-0" 
            placeholder="Dental Checkup"
            didError={!!errors.treatmentName?.message}
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              clearErrors('treatmentName');
            }}
          />
        )}
      />
      <ErrorMessage message={errors.treatmentName?.message} />

      <label className="text-sm font-medium text-gray-500 tracking-tight mt-6">Category</label>
      <Controller
        name="treatmentCategory"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <div className="flex mt-2 items-center justify-center gap-4 w-full">
            {["Medical", "Cosmetic"].map((category, index) => (
              <RadioButton 
                key={index}
                className="h-10 w-full" 
                didError={!!errors.treatmentCategory?.message}
                value={category}
                checked={value === category}
                setChecked={value => {
                  onChange(value);
                  clearErrors('treatmentCategory');
                }}              
              />
            ))}
          </div>
        )}
      />

      <ErrorMessage message={errors.treatmentCategory?.message} />

      <label className={`text-sm font-medium text-gray-500 tracking-tight mt-6`}>Description</label>
      <Controller
        name="treatmentDescription"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value} }) => (
          <TextArea
            className="h-10 w-full mt-2 flex-shrink-0" 
            placeholder="Type a description..."
            didError={!!errors.treatmentDescription?.message}
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              clearErrors('treatmentDescription');
            }}
          />
        )}
      />

      <ErrorMessage message={errors.treatmentDescription?.message} />
      
      <hr className="outline-gray-200 outline-dashed-[1px] mt-8" />  
      <label className="text-lg font-medium text-gray-700 tracking-tight mt-6 mb-2">Cost & Duration</label>
      <label className="text-sm font-medium text-gray-500 tracking-tight ">Pricing Option</label>
      <Controller
        name="treatmentChargeType"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <div className="flex mt-2 items-center justify-center gap-4 w-full">
            {["Tooth", "Section", "General"].map((type, index) => (
              <RadioButton 
                key={index}
                className="h-10 w-full" 
                didError={!!errors.treatmentChargeType?.message}
                value={type}
                checked={value === type}
                setChecked={value => {
                  onChange(value);
                  clearErrors('treatmentChargeType');
                }}              
              />
            ))}
          </div>
        )}
      />
      <ErrorMessage message={errors.treatmentChargeType?.message} />

      <div className="flex items-start justify-center w-full gap-4 mt-6">
        <div className="flex flex-col justify-start w-full">
        <label className="text-sm font-medium text-gray-500 tracking-tight flex items-center justify-start gap-2">
          Price
          <span className={`px-2 rounded-md font-normal uppercase text-xs tracking-wide
              ${treatmentChargeType === "General" && "bg-green-50 text-green-500"}
              ${treatmentChargeType === "Tooth" && "bg-sky-50 text-sky-500"}
              ${treatmentChargeType === "Section" && "bg-purple-50 text-purple-500"}
            `}>
           {treatmentChargeType === "General" && "General" }
           {treatmentChargeType === "Tooth" && "per tooth" }
           {treatmentChargeType === "Section" && "per section" }
          </span>
        </label>
          <Controller
            name="treatmentCost"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value} }) => (
              <PriceInput
                currency="₱"
                className="h-10 w-full mt-2 flex-shrink-0" 
                didError={!!errors.treatmentCost?.message}
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                  clearErrors('treatmentCost');
                }}
                placeholder="1000.00"
                maxLength={10}
              />
            )}
          />        
          <ErrorMessage message={errors.treatmentCost?.message} />
        </div>
        <div className="flex flex-col justify-start w-full">
          <label className={`text-sm font-medium text-gray-500 tracking-tight`}>Estimate Duration</label>
          <Controller
            name="treatmentDuration"
            control={control}
            defaultValue=""
            render={({ field : { onChange, value } }) => (
              <ComboBox
                className="mt-2"
                placeholder="duration"
                options={durationOptionList}
                value={value}
                setValue={(value) => {
                  onChange(value);
                  clearErrors('treatmentDuration');
                }}
                didError={!!errors.treatmentDuration?.message}
              />
            )}
          />        
          <ErrorMessage message={errors.treatmentDuration?.message} />
        </div>
      </div>

      <hr className="outline-gray-200 outline-dashed-[1px] mt-8" />  
      <label className="text-lg font-medium text-gray-700 tracking-tight mt-6 mb-2">Advanced Settings</label>

      <div className="ring-1 ring-gray-200  px-4 py-4 rounded-md flex items-center justify-between">
        <div className="flex flex-col items-start w-full">
          <label className="text-base font-medium text-gray-700 tracking-tight">
            {treatmentComponents.length > 0 &&
              <span className="mr-1">{treatmentComponents.length}</span> 
            }
            {treatmentComponents.length > 1 ? "Components" : "Component"}
            {treatmentComponents.length < 1 && " used"}
          </label>
          <p className="text-sm text-gray-500 ">Each part of the component is utilized for patient treatment</p>
        </div>
        <button 
          type="button"
          className="w-20 flex items-center justify-center text-lime-500"
          onClick={handleOpenAddMoreComponents}
        >
          {treatmentComponents.length > 0 ? "Edit" : "Setup"}
        </button>
      </div>

      <div className="ring-1 ring-gray-200  px-4 py-4 rounded-md flex items-center justify-between mt-6 ">
        <div className="flex flex-col items-start w-full">
          <label className="text-base font-medium text-gray-700 tracking-tight">
            {treatmentMedicines.length > 0 &&
              <span className="mr-1">{treatmentMedicines.length}</span> 
            }
            {treatmentMedicines.length > 1 ? "Medicines" : "Medicine"}
            {treatmentMedicines.length < 1 && " used"}
          </label>
          <p className="text-sm text-gray-500 ">Each medicines is used to give prescription to patients.</p>
        </div>
        <button 
          type="button"
          className="w-20 flex items-center justify-center text-lime-500"
          onClick={handleOpenAddMoreMedicines}
        >
          {treatmentMedicines.length > 0 ? "Edit" : "Setup"}
        </button>
      </div>
      
    </section>
  )
}

export default BasicInformationStep
