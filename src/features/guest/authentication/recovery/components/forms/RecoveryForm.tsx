import { Controller } from 'react-hook-form'
import Button from '@components/ui/Button'
import Input from '@components/ui/Input'
import ErrorMessage from '@components/ui/ErrorMessage'
import useRecovery from '../../hooks/useRecovery'
import { useRecoveryStore } from '../../stores/recovery.store'


const RecoveryForm = () => {

  const isLoading = useRecoveryStore((state) => state.isLoading)
  const methods = useRecovery()
  const { 
    control, 
    handleSubmit, 
    onSubmit, 
    formState: { errors }, 
    clearErrors, 
  } = methods


  return (
    <form 
      className=" w-[20rem] flex-col flex items-start justify-center "
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl font-medium tracking-tight text-gray-700">Forgot Password</h1>
      <p className="text-sm text-gray-500 mt-2">
        Enter your email address and we will send you a link to reset your password.
      </p>
      <label className="text-sm text-gray-700 mt-4">Email</label>
      <Controller 
        name="email"
        control={control}
        render={({ field: { onChange, value} }) => (
          <Input 
            type="text" 
            placeholder="Enter your email" 
            className="w-full mt-2" 
            value={value} 
            onChange={(e) => {
              onChange(e.target.value)
              clearErrors("email")
            }}
            didError={!!errors?.email}
          />
        )}
      />
      <ErrorMessage message={errors?.email?.message} />

      <Button 
        variant={isLoading ? "disabled" : "primary"}
        disabled={isLoading}
        className="w-full mt-8" 
        type="submit"
      >
        Recover
      </Button>

    </form>
  )
}

export default RecoveryForm
