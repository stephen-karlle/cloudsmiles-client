import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { useRecoveryStore } from '../../stores/recovery.store'
import Button from '@components/ui/Button'
import ErrorMessage from '@components/ui/ErrorMessage'
import PasswordInput from '@components/ui/PasswordInput'
import useResetPassword from '../../hooks/useResetPassword'
import PasswordStrengthIndicator from '@components/shared/PasswordStrengthIndicator'

type ResetPasswordFormProps = {
  token: string
}

const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {

  const [toggle, setToggle] = useState<boolean>(false)
  const isLoading = useRecoveryStore((state) => state.isLoading)

  const { control, handleSubmit, onSubmit, formState: { errors }, clearErrors, watch } = useResetPassword(token)
  const newPassword = watch('newPassword')

  return (
    <form 
      className=" w-[20rem] flex-col flex items-start justify-center "
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl font-medium tracking-tight text-gray-700">Reset Password</h1>
      <p className="text-sm text-gray-500 mt-2">
        To reset your password, enter your new password below.
      </p>
      <label className="text-sm text-gray-700 mt-4">New Password</label>
      <Controller 
        name="newPassword"
        control={control}
        render={({ field: { onChange, value} }) => (
          <PasswordInput 
            value={value}
            onChange={(e) =>{
              onChange(e.target.value)
              clearErrors("newPassword")
            }}
            className="w-full mt-2" 
            toggle={toggle} 
            setToggle={setToggle}
            didError={!!errors?.newPassword}
          />
        )}
      />
      {newPassword && (
        <PasswordStrengthIndicator password={newPassword} />
      )}

      <ErrorMessage message={errors?.newPassword?.message} />
      <label className="text-sm text-gray-700 mt-4">Confirm Password</label>
      <Controller 
        name="confirmPassword"
        control={control}
        render={({ field: { onChange, value} }) => (
          <PasswordInput 
            value={value}
            onChange={(e) =>{
              onChange(e.target.value)
              clearErrors("confirmPassword")
            }}
            className="w-full mt-2" 
            toggle={toggle} 
            setToggle={setToggle}
            didError={!!errors?.confirmPassword}
          />
        )}
      />
      <ErrorMessage message={errors?.confirmPassword?.message} />
      <Button 
        disabled={isLoading}
        variant={isLoading ? "disabled" : "primary"}
        className="w-full mt-4" 
        type="submit"
      >
        Reset Password
      </Button>

    </form>  
  )
}

export default ResetPasswordForm