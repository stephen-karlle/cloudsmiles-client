import { useFormContext, Controller, } from 'react-hook-form';
import { useDrawerStore } from '@stores/drawer.store';
import ImageInput from '@components/ui/ImageInput';
import RadioButton from '@components/ui/RadioButton';
import Label from '@components/ui/Label';
import EmailInput from '@components/ui/EmailInput';
import ErrorMessage from '@components/ui/ErrorMessage';
import Input from '@components/ui/Input';
import PhoneInput from '@components/ui/PhoneInput';
import TextArea from '@components/ui/TextArea';

const VendorStep = () => {

  const isLoading = useDrawerStore((state) => state.isLoading)

  const {
    control,
    formState: { errors },
    clearErrors,
  } = useFormContext()

  return (
    <section className="w-full h-full overflow-y-scroll flex flex-col p-6">
      <Controller
        name="vendorAvatar"
        control={control}
        render={({ field : { value, onChange } }) => (
          <ImageInput
            onChange={onChange}
            value={value}
          />
        )}
      />
      <Label className="mt-6">Contact Person</Label>
      <Controller
        name="vendorContactPerson"
        control={control}
        defaultValue=""
        render={({ field: { onChange,value } }) => (
          <Input  
            value={value}
            type="text"
            className="h-10 w-full mt-2 flex-shrink-0" 
            placeholder="Juan Dela Cruz"
            didError={!!errors.vendorContactPerson?.message}
            onChange={(e) => {
              onChange(e.target.value);
              clearErrors('vendorContactPerson');
            }}
            isDisabled={isLoading}
          />
        )}
      />  
      <ErrorMessage message={errors.vendorContactPerson?.message} />

      <Label className="mt-6">Vendor Type</Label>
      <Controller
        name="vendorType"
        control={control}
        defaultValue=""
        render={({ field: { onChange,value } }) => (
          <div className="flex items-center justify-center gap-4 mt-2">
            {['Supplier', 'Manufacturer', 'Distributor'].map((type) => (
              <RadioButton 
                className="h-10 w-full" 
                value={type}
                checked={value === type}
                setChecked={value => {
                  onChange(value);
                }}
                didError={!!errors?.vendorType}
                key={type}
              />
            ))}
          </div>
        )}
      />  
      <ErrorMessage message={errors.vendorType?.message} />


      <Label className="mt-6">Company Name</Label>
      <Controller
        name="vendorCompanyName"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <Input  
            value={value}
            type="text"
            className="h-10 w-full mt-2 flex-shrink-0" 
            placeholder="Acme Corporation"
            didError={!!errors.vendorCompanyName?.message}
            onChange={(e) => {
              onChange(e.target.value);
              clearErrors('vendorCompanyName');
            }}
          />
        )}
      />  
      <ErrorMessage message={errors.vendorCompanyName?.message} />


      <Label className="mt-6">Email</Label>
      <Controller
        name="vendorEmail"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <EmailInput
            value={value}
            className="h-10 w-full mt-2 flex-shrink-0" 
            placeholder="example@mail.com"
            didError={!!errors.vendorEmail?.message}
            onChange={(e) => {
              onChange(e.target.value);
              clearErrors('vendorEmail');
            }}
          />
        )}
      />  
      <ErrorMessage message={errors.vendorEmail?.message} />

      <Label className="mt-6">Phone Number</Label>
      <Controller
        name="vendorPhoneNumber"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <PhoneInput
            className="h-10 w-full mt-2 flex-shrink-0" 
            placeholder="09876543210"
            didError={!!errors.vendorPhoneNumber?.message}
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              clearErrors('vendorPhoneNumber');
            }}
          />
        )}
      />  
      <ErrorMessage message={errors.vendorPhoneNumber?.message} />


      <Label className="mt-6">Address</Label>
      <Controller
        name="vendorAddress"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextArea
            className="h-10 w-full mt-2 flex-shrink-0" 
            placeholder="Type the address here..."
            didError={!!errors.vendorAddress?.message}
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              clearErrors('vendorAddress');
            }}
          />
        )}
      />  
      <ErrorMessage message={errors.vendorAddress?.message} />
    </section>  
  )
}

export default VendorStep