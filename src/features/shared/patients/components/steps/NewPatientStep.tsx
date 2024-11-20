import { Controller, useFormContext } from 'react-hook-form';
import { Fragment } from 'react/jsx-runtime';
import { usePatientStore } from '../../stores/patient.store';
import DatePicker from '@components/ui/DatePicker';
import EmailInput from '@components/ui/EmailInput';
import ErrorMessage from '@components/ui/ErrorMessage';
import ImageInput from '@components/ui/ImageInput';
import Input from '@components/ui/Input';
import PhoneInput from '@components/ui/PhoneInput';
import RadioButton from '@components/ui/RadioButton';
import TextArea from '@components/ui/TextArea';
import Label from '@components/ui/Label';

const NewPatientStep = () => {

  const isLoading = usePatientStore((state) => state.isLoading)

  const { control, clearErrors, formState: { errors } } = useFormContext()

  return (
    <article className="w-full h-full flex flex-col overflow-y-scroll px-6 py-4 overflow-x-hidden outline-none ">
       <Label className="mb-2">Picture</Label>
      <Controller
        name="patientAvatar"
        control={control}
        render={({ field : { value, onChange } }) => (
          <ImageInput
            onChange={onChange}
            value={value}
          />
        )}
      />

      <Label className="mt-6">Patient Name</Label>
      <Controller
        name="patientFullName"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value} }) => (
          <Input 
            type="text"
            value={value}
            className="h-10 w-full mt-2" 
            placeholder="Juan Dela Cruz"
            onChange={(e) => {
              onChange(e);
              clearErrors('patientFullName');
            }}
            isDisabled={isLoading}
            didError={!!errors?.patientFullName?.message}
          />
        )}
      />
      <ErrorMessage message={errors?.patientFullName?.message}  />
      <section className="flex w-full items-center justify-start gap-4">
        <div className="flex flex-col w-full justify-start h-full">
          <Label className="mt-6">Date of Birth</Label>
          <Controller 
            name="patientDateOfBirth"
            control={control}
            render={({ field: { value, onChange } }) => (
              <DatePicker 
                setValue={(date) => {
                  onChange(date)
                  clearErrors('patientDateOfBirth')
                }}
                value={value}
                className="w-full mt-2"
                placeholder="birthdate"
                type='dateOfBirth'
                didError={!!errors?.patientDateOfBirth}
                isDisabled={isLoading}
              />
            )}
          />
          <ErrorMessage message={errors?.patientDateOfBirth?.message} />

        </div>
        <div className="flex flex-col w-full justify-start h-full">
          <Label className="mt-6">Gender</Label>
          <div className="flex mt-2 items-center justify-center gap-4 w-full">
            <Controller
              name="patientGender"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Fragment>
                  <RadioButton 
                    className="h-10 w-full" 
                    value="Male"
                    checked={value === "Male"}
                    setChecked={value => {
                      onChange(value);
                    }}
                    didError={!!errors?.patientGender}
                    isDisabled={isLoading}                              
                  />
                  <RadioButton 
                    className="h-10 w-full" 
                    value="Female"
                    checked={value === "Female"}
                    setChecked={value => {
                      onChange(value);
                    }}
                    didError={!!errors?.patientGender}
                    isDisabled={isLoading}
                  />
                </Fragment>
              )}
            />
          </div>
          <ErrorMessage message={errors?.patientGender?.message} />
        </div>
      </section>


      
      <Label className="mt-6">Email</Label>
      <Controller
        name="patientEmail"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value} }) => (
          <EmailInput 
            value={value}
            className="h-10 w-full mt-2" 
            placeholder="m@example.com"
            onChange={(e) => {
              onChange(e);
              clearErrors('patientEmail');
            }}
            didError={!!errors.patientEmail?.message}
            isDisabled={isLoading}
          />
        )}
      />

      <ErrorMessage message={errors?.patientEmail?.message} />

      <Label className="mt-6">Phone Number</Label>
      <Controller
        name="patientPhoneNumber"
        control={control}
        defaultValue=""
        render={({ field : { onChange, value}}) => (
          <PhoneInput 
            className="h-10 w-full mt-2" 
            placeholder="+63 987 6543 210"
            value={value}
            onChange={(e) => {
              onChange(e);
              clearErrors('patientPhoneNumber');
            }}
            didError={!!errors.patientPhoneNumber?.message}
            isDisabled={isLoading}
          />
        )}
      />
      <ErrorMessage message={errors?.patientPhoneNumber?.message} />


      <Label className="mt-6">Address</Label>
      <Controller
        name="patientAddress"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value} }) => (
          <TextArea 
            value={value}
            className=" w-full mt-2" 
            placeholder="San Fernando Pampanga"
            onChange={(e) => {
              onChange(e);
              clearErrors('patientAddress');
            }}
            didError={!!errors.patientAddress?.message}
            maxRows={5}
            isDisabled={isLoading}
          />
        )}
      />
      <ErrorMessage message={errors?.patientAddress?.message} />
    </article>
  )
}

export default NewPatientStep