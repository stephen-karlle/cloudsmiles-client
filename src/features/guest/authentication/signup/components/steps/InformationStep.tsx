import { Controller, useFormContext } from 'react-hook-form'
import { Fragment } from 'react/jsx-runtime'
import Button from '@components/ui/Button'
import Input from '@components/ui/Input'
import TextArea from '@components/ui/TextArea'
import ErrorMessage from '@components/ui/ErrorMessage'
import DatePicker from '@components/ui/DatePicker'
import RadioButton from '@components/ui/RadioButton'
import { useSignUpStore } from '../../stores/useSignUpStore'



const InformationStep = () => {

  const isLoading = useSignUpStore((state) => state.isLoading)

  const { 
    clearErrors, 
    control, 
    formState: { errors }, 
  } = useFormContext()
  const formErrors = errors.patientData as any

  return (
    <div className="w-[20rem] flex-col flex items-start justify-center ">
      <div className="mb-2 flex flex-col">
        <h1 className="text-2xl font-medium tracking-tight text-gray-700 mt-4">Information</h1>
        <p className="text-sm text-gray-500 mt-1">Become a member — To start experiencing the best dental care</p>
      </div>
      <div className="flex flex-col w-full items-start justify-start">
        <label className="text-sm text-gray-700 mt-4">Full Name</label>
        <Controller
          name="patientData.patientFullName"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <Input
              value={value}
              type="text"
              className="w-full mt-2" 
              placeholder="Juan Dela Cruz"
              onChange={(e) => {
                onChange(e);
                clearErrors('patientData.patientFullName');
              }}
              // isDisabled={isLoading}
              didError={!!formErrors?.patientFullName?.message}
            />
          )}
        />      
        <ErrorMessage message={formErrors?.patientFullName?.message} />
      </div>

      <div className="flex flex-col w-full items-start justify-start">
        <label className="text-sm text-gray-700 mt-4">Date of Birth</label>
        <Controller
          name="patientData.patientDateOfBirth"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <DatePicker
              type="dateOfBirth"
              value={value}
              className="w-full mt-2" 
              placeholder="Select your date of birth..."
              setValue={(date) => {
                onChange(date);
                clearErrors('patientData.patientDateOfBirth');
              }}
              didError={!!formErrors?.patientDateOfBirth?.message}
            />
          )}
        />      
        <ErrorMessage message={formErrors?.patientDateOfBirth?.message} />
      </div>
      <div className="flex flex-col w-full justify-start h-full">
        <label className="text-sm text-gray-700 mt-4">Gender</label>
        <div className="flex mt-2 items-center justify-center gap-4 w-full">
          <Controller
            name="patientData.patientGender"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Fragment>
                <RadioButton 
                  className="h-10 w-full" 
                  value="Male"
                  checked={value === "Male"}
                  setChecked={item => {
                    onChange(item);
                    clearErrors('patientData.patientGender');
                  }}
                  didError={!!formErrors?.patientGender}
                />
                <RadioButton 
                  className="h-10 w-full" 
                  value="Female"
                  checked={value === "Female"}
                  setChecked={item => {
                    onChange(item);
                    clearErrors('patientData.patientGender');
                  }}
                  didError={!!formErrors?.patientGender}
                />
              </Fragment>
            )}
          />
        </div>
        <ErrorMessage message={formErrors?.patientGender?.message} />
      </div>
      <div className="flex flex-col w-full items-start justify-start">
        <label className="text-sm text-gray-700 mt-4">Address</label>
        <Controller
          name="patientData.patientAddress"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextArea
              value={value}
              className="w-full mt-2" 
              placeholder="Type your address..."
              onChange={(e) => {
                onChange(e);
                clearErrors('patientData.patientAddress');
              }}
              // isDisabled={isLoading}
              didError={!!formErrors?.patientAddress?.message}
            />
          )}
        />      
        <ErrorMessage message={formErrors?.patientAddress?.message} />
      </div>

      <div className="mt-2 mb-4">        
        <p className="text-neutral-500 text-sm">I have read and agree to 
          <button className="text-lime-500 ml-1">Terms & Conditions</button>
        </p>
      </div>
      <Button
        variant={isLoading ? "disabled" : "primary"}
        disabled={isLoading}
        className="w-full mt-4" 
        type="submit"
      >
        Submit
        </Button>
    </div>
  )
}

export default InformationStep
