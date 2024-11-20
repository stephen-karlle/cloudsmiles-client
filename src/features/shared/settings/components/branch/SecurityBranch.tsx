import { useState } from "react";
import { useSettingsStore } from "../../stores/settings.store";
import { Controller } from "react-hook-form";
import ErrorMessage from "@components/ui/ErrorMessage";
import Label from "@components/ui/Label";
import Button from "@components/ui/Button";
import PasswordInput from "@components/ui/PasswordInput";
import useChangePassword from "../../hooks/useChangePassword";
import PasswordStrengthIndicator from "@components/shared/PasswordStrengthIndicator";

const SecurityBranch = () => {
  const [ toggleOldPassword, setToggleOldPassword ] = useState<boolean>(true)
  const [ toggleNewPassword, setToggleNewPassword ] = useState<boolean>(true)
  const { control, formState: { errors }, clearErrors, handleSubmit, onSubmit, watch} = useChangePassword()
  const isLoading = useSettingsStore((state) => state.isLoading)
  const newPassword = watch('newPassword')

  return (
    <form 
      className="w-full h-full flex flex-col overflow-y-scroll"
      onSubmit={handleSubmit(onSubmit)}
    >
      <section className="flex flex-col w-full max-w-[50rem] p-6">

        <div className="flex flex-col items-start w-full ">
          <Label>Old Password</Label>
          <Controller
            name="oldPassword"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }}) => (
              <PasswordInput
                toggle={toggleOldPassword}
                setToggle={setToggleOldPassword}
                className="h-10 w-full mt-2 flex-shrink-0" 
                didError={!!errors.oldPassword?.message}
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                  clearErrors('oldPassword');
                }}
              />
            )}
          />
          <ErrorMessage message={errors.oldPassword?.message} />
        </div>
       

        <div className="flex flex-col items-start w-full mt-6">
          <Label>New Password</Label>
          <Controller
            name="newPassword"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }}) => (
              <PasswordInput
                toggle={toggleNewPassword}
                setToggle={setToggleNewPassword}
                className="h-10 w-full mt-2 flex-shrink-0" 
                didError={!!errors.newPassword?.message}
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                  clearErrors('newPassword');
                }}
              />
            )}
          />
          <ErrorMessage message={errors.newPassword?.message} />
        </div>
        {newPassword && (
          <PasswordStrengthIndicator password={newPassword} />
        )}

        <div className="flex flex-col items-start w-full mt-6">
          <Label>Confirm Password</Label>
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }}) => (
              <PasswordInput
                toggle={toggleNewPassword}
                setToggle={setToggleNewPassword}
                className="h-10 w-full mt-2 flex-shrink-0" 
                didError={!!errors.confirmPassword?.message}
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                  clearErrors('confirmPassword');
                }}
              />
            )}
          />
          <ErrorMessage message={errors.confirmPassword?.message} />
        </div>
       
        <footer className="flex w-full py-6 justify-start">
          <Button
            className="h-10 w-fit"
            type="submit"
            variant={isLoading ? "disabled" : "primary"}
            disabled={isLoading}
          >
            Change Password
          </Button>
        </footer>
      </section>
    </form>
  )
}

export default SecurityBranch