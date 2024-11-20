import { useSettingsStore } from "../../stores/settings.store";
import { Controller } from "react-hook-form";
import ErrorMessage from "@components/ui/ErrorMessage";
import Input from "@components/ui/Input";
import Label from "@components/ui/Label";
import RadioButton from "@components/ui/RadioButton";
import DatePicker from "@components/ui/DatePicker";
import TextArea from "@components/ui/TextArea";
import EmailInput from "@components/ui/EmailInput";
import PhoneInput from "@components/ui/PhoneInput";
import Button from "@components/ui/Button";
import ImageInput from "@components/ui/ImageInput";
import useEditProfile from "../../hooks/useEditProfile";


const ProfileBranch = () => {

  const { control, formState: { errors }, clearErrors, handleSubmit, onSubmit } = useEditProfile()
  const isLoading = useSettingsStore((state) => state.isLoading)


  return (
    <form 
      className="w-full h-full flex flex-col overflow-y-scroll"
      onSubmit={handleSubmit(onSubmit)}
    >
      <section className="flex flex-col w-full max-w-[50rem] p-6">
        <div className="flex flex-col items-start w-full">
          
          <Label className="mb-4">Picture</Label>
          <Controller
            name="profileAvatar"
            control={control}
            render={({ field : { value, onChange } }) => (
              <ImageInput
                onChange={onChange}
                value={value}
              />
            )}
          />
        </div>
        <div className="flex flex-col items-start w-full mt-6">
          <Label>Full Name</Label>
          <Controller
            name="profileFullName"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }}) => (
              <Input
                type="text"
                className="h-10 w-full mt-2 flex-shrink-0" 
                placeholder="John Doe"
                didError={!!errors.profileFullName?.message}
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                  clearErrors('profileFullName');
                }}
              />
            )}
          />
          <ErrorMessage message={errors.profileFullName?.message} />
        </div>
        <div className="flex flex-col items-start w-full mt-6">
          <Label>Gender</Label>
          <Controller
            name="profileGender"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }}) => (
              <div className="w-full flex items-center gap-4">
                {["Male", "Female"].map((gender, index) => (
                  <RadioButton
                    key={index}
                    value={gender}
                    setChecked={onChange}
                    checked={value === gender}
                    didError={!!errors.profileGender?.message}
                    className="w-full mt-2"
                  />
                ))}
              </div>
            )}
          />
          <ErrorMessage message={errors.profileGender?.message} />
        </div>
        <div className="flex flex-col items-start w-full mt-6">
          <Label>Birthday</Label>
          <Controller
            name="profileDateOfBirth"
            control={control}
            render={({ field: { onChange, value }}) => (
              <DatePicker
                type="dateOfBirth"
                className="h-10 w-full mt-2 flex-shrink-0" 
                placeholder="John Doe"
                didError={!!errors.profileDateOfBirth?.message}
                value={value}
                setValue={(date) => {
                  onChange(date.toISOString());
                  clearErrors('profileDateOfBirth');
                }}
              />
            )}
          />
          <ErrorMessage message={errors.profileDateOfBirth?.message} />
        </div>       
        <div className="flex flex-col items-start w-full mt-6">
          <Label>Email</Label>
          <Controller
            name="profileEmail"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }}) => (
              <EmailInput
                className="h-10 w-full mt-2 flex-shrink-0" 
                placeholder="example@mail.com"
                didError={!!errors.profileEmail?.message}
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                  clearErrors('profileEmail');
                }}
              />
            )}
          />
          <ErrorMessage message={errors.profileEmail?.message} />
        </div>
        <div className="flex flex-col items-start w-full mt-6">
          <Label>Phone</Label>
          <Controller
            name="profilePhoneNumber"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }}) => (
              <PhoneInput
                className="h-10 w-full mt-2 flex-shrink-0" 
                placeholder="09876543210"
                didError={!!errors.profilePhoneNumber?.message}
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                  clearErrors('profilePhoneNumber');
                }}
              />
            )}
          />
          <ErrorMessage message={errors.profilePhoneNumber?.message} />
        </div>
        <div className="flex flex-col items-start w-full mt-6">
          <Label>Address</Label>
          <Controller
            name="profileAddress"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }}) => (
              <TextArea
                className="h-10 w-full mt-2 flex-shrink-0" 
                placeholder="John Doe"
                didError={!!errors.profileAddress?.message}
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                  clearErrors('profileAddress');
                }}
              />
            )}
          />
          <ErrorMessage message={errors.profileAddress?.message} />
        </div>

        <footer className="flex w-full py-6 justify-start">
          <Button
            className="h-10 w-fit"
            type="submit"
            variant={isLoading ? "disabled" : "primary"}
            disabled={isLoading}
          >
            Update Profile
          </Button>
        </footer>
      </section>
    </form>
  )
}

export default ProfileBranch