import { Controller, useFormContext } from 'react-hook-form';
import { dentistSpecializationConstants } from '../../constants/dentists.constants';
import { assistantRoleConstants } from '../../constants/assistant.constants';
import ComboBox from '@components/ui/ComboBox';
import EmailInput from '@components/ui/EmailInput';
import ErrorMessage from '@components/ui/ErrorMessage';
import ImageInput from '@components/ui/ImageInput';
import Input from '@components/ui/Input';
import PhoneInput from '@components/ui/PhoneInput';
import TextArea from '@components/ui/TextArea';
import RadioButton from '@components/ui/RadioButton';
import Label from '@components/ui/Label';
import DatePicker from '@components/ui/DatePicker';

type DetailsStepProps = {
  type: 'dentist' | 'assistant';
}

const DetailsStep = ({ type }: DetailsStepProps) => {
  const { 
    control, 
    formState: { errors }, 
    clearErrors,
  } = useFormContext();


  return (
    <section className="w-full h-full flex flex-col overflow-y-scroll px-6 py-4 overflow-x-hidden outline-none">
      <Controller
        name={`${type}Avatar`}
        control={control}
        render={({ field: { value, onChange } }) => (
          <ImageInput
            onChange={onChange}
            value={value}
          />
        )}
      />

      <Label className="mt-6">Full Name</Label>
      <Controller
        name={`${type}FullName`}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            value={value}
            type="text"
            className="h-10 w-full mt-2 flex-shrink-0"
            placeholder="Juan Dela Cruz"
            didError={!!errors?.[`${type}FullName`]?.message}
            onChange={(e) => {
              onChange(e);
              clearErrors(`${type}FullName`);
            }}
          />
        )}
      />
      <ErrorMessage message={errors?.[`${type}FullName`]?.message} />

      <Label className="mt-6">Employment Type</Label>
      <Controller
        name={`${type}EmploymentType`}
        control={control}
        render={({ field: { value, onChange } }) => (
          <ComboBox 
            value={value}
            className="mt-2 z-20"
            placeholder="Employment Type"
            options={["Full time", "Part time"]}
            setValue={(newValue) => {
              onChange(newValue);
              clearErrors(`${type}EmploymentType`);
            }}
            didError={!!errors?.[`${type}EmploymentType`]?.message}
          />
        )}
      />
      <ErrorMessage message={errors?.[`${type}EmploymentType`]?.message} />
      <div className="flex items-start justif-ystart gap-4">
        <div className='flex flex-col w-full'>
          <Label className="mt-6">Birthday</Label>
          <Controller
            name={`${type}DateOfBirth`}
            control={control}
            render={({ field: { onChange, value }}) => (
              <DatePicker
                type="dateOfBirth"
                className="h-10 w-full mt-2 flex-shrink-0 z-10" 
                placeholder="John Doe"
                didError={!!errors?.[`${type}DateOfBirth`]?.message}
                value={value}
                setValue={(date) => {
                  onChange(date.toISOString());
                  clearErrors(`${type}DateOfBirth`);
                }}
              />
            )}
          />
          <ErrorMessage message={errors?.[`${type}DateOfBirth`]?.message} />
        </div>

        <div className='flex flex-col w-full'>
          <Label className="mt-6">Gender</Label>
          <Controller
            name={`${type}Gender`}
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }}) => (
              <div className="w-full flex items-center gap-4">
                {["Male", "Female"].map((gender, index) => (
                  <RadioButton
                    key={index}
                    value={gender}
                    setChecked={(newValue) => {
                      onChange(newValue);
                      clearErrors(`${type}Gender`);
                    }}
                    checked={value === gender}
                    didError={!!errors?.[`${type}Gender`]?.message}
                    className="w-full mt-2"
                  />
                ))}
              </div>
            )}
          />
          <ErrorMessage message={errors?.[`${type}Gender`]?.message} />
        </div>
      </div>

      <Label className="mt-6">
        {type === 'dentist' ? 'Specialization' : 'Role'}
      </Label>      
      <Controller
        name={type === 'dentist' ? 'dentistSpecialization' : 'assistantRole'}
        control={control}
        render={({ field: { onChange, value } }) => {
          const placeholder = type === 'dentist' ? 'specialization' : 'role';
          const options = type === 'dentist' ? dentistSpecializationConstants : assistantRoleConstants;
          const fieldName = type === 'dentist' ? 'dentistSpecialization' : 'assistantRole';

          return (
            <ComboBox
              value={value}
              className="mt-2"
              placeholder={placeholder}
              options={options}
              setValue={(newValue) => {
                onChange(newValue);
                clearErrors(fieldName);
              }}
              didError={!!errors?.[fieldName]?.message}
            />
          );
        }}
      />
      <ErrorMessage message={errors?.[`${type === 'dentist' ? 'dentistSpecialization' : 'assistantRole'}`]?.message} />


      <Label className="mt-6">Phone Number</Label>
      <Controller
        name={`${type}PhoneNumber`}
        control={control}
        render={({ field: { onChange, value } }) => (
          <PhoneInput
            value={value}
            className="h-10 w-full mt-2 flex-shrink-0"
            placeholder="09123456789"
            didError={!!errors?.[`${type}PhoneNumber`]?.message}
            onChange={(e) => {
              onChange(e);
              clearErrors(`${type}PhoneNumber`);
            }}
          />
        )}
      />
      <ErrorMessage message={errors?.[`${type}PhoneNumber`]?.message} />

      <Label className="mt-6">Email</Label>
      <Controller
        name={`${type}Email`}
        control={control}
        render={({ field: { onChange, value } }) => (
          <EmailInput
            value={value}
            className="h-10 w-full mt-2 flex-shrink-0"
            placeholder="example@email.com"
            didError={!!errors?.[`${type}Email`]?.message}
            onChange={(e) => {
              onChange(e);
              clearErrors(`${type}Email`);
            }}
          />
        )}
      />
      <ErrorMessage message={errors?.[`${type}Email`]?.message} />

      <Label className="mt-6">Address</Label>
      <Controller
        name={`${type}Address`}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextArea
            value={value}
            className="h-10 w-full mt-2 flex-shrink-0"
            placeholder="Type the address here..."
            didError={!!errors?.[`${type}Address`]?.message}
            onChange={(e) => {
              onChange(e);
              clearErrors(`${type}Address`);
            }}
          />
        )}
      />
      <ErrorMessage message={errors?.[`${type}Address`]?.message} />
    </section>
  );
}

export default DetailsStep;
