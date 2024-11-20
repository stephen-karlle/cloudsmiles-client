import ComboBox from '@components/ui/ComboBox';
import ErrorMessage from '@components/ui/ErrorMessage';
import Input from '@components/ui/Input';
import TextArea from '@components/ui/TextArea';
import { Controller, useFormContext } from 'react-hook-form'

const AddContextInformationStep = () => {

  const { 
    control, 
    formState : { errors}, 
    clearErrors,
  } = useFormContext()

  return (
    <section className="w-full h-full flex flex-col overflow-y-scroll px-6 py-4 overflow-x-hidden outline-none ">
      <label className="text-lg font-medium text-gray-700 tracking-tight mb-2">Context Information</label>
      <label className={`text-sm font-medium text-gray-500 tracking-tight `}>Name</label>
      <Controller
        name="contextLabel"
        control={control}
        render={({ field: { onChange } }) => (
          <Input
            type="text"
            className="h-10 w-full mt-2 flex-shrink-0" 
            placeholder="Where is your dental clinic located?"
            didError={!!errors.contextLabel?.message}
            onChange={(e) => {
              onChange(e);
              clearErrors('contextLabel');
            }}
          />
        )}
      />
      <ErrorMessage message={errors.contextLabel?.message} />

      <label className={`text-sm font-medium text-gray-500 tracking-tight mt-6`}>Category</label>
      <Controller
        name="contextCategory"
        control={control}
        render={({ field: { onChange, value } }) => (
          <ComboBox
            value={value ?? ""}
            options={[
              "Location",
              "Service",
              "Product",
              "Payment",
              "Details",
              "Contact",
              "Schedule",
              "Feedback",
              "Complaint",
              "Other",
            ]}
            className="h-10 w-full mt-2 flex-shrink-0" 
            placeholder="category."
            didError={!!errors.contextCategory?.message}
            setValue={(value) => {
              onChange(value);
              clearErrors('contextCategory');
            }}
          />
        )}
      />
      <ErrorMessage message={errors.contextCategory?.message} />


      <label className={`text-sm font-medium text-gray-500 tracking-tight mt-6 `}>Data</label>
      <Controller
        name="contextData"
        control={control}
        render={({ field : { onChange }}) => (
          <TextArea
            className="h-10 w-full mt-2 flex-shrink-0" 
            placeholder="Type the data here."
            didError={!!errors.contextData?.message}
            onChange={(e) => {
              onChange(e);
              clearErrors('contextData');
            }}
          />
        )}
      />  
      <ErrorMessage message={errors.contextData?.message} />
      {!!errors.contextData?.message || <p className="text-sm mt-2 text-gray-500"> This is the data that will be used for semantic search.</p>}

    </section>
  )
}

export default AddContextInformationStep