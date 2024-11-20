import { Controller } from 'react-hook-form'
import { useVerifyStore } from '../stores/verify.stores'
import { resendOtp } from '../services/verify.services'
import { useMutation } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import Button from '@components/ui/Button'
import ErrorMessage from '@components/ui/ErrorMessage'
import useVerify from '../hooks/useVerify'
import OTPInput from '@components/ui/OTPInput'
import Label from '@components/ui/Label'

type VerifyFormProps = {
  email: string
}

const VerifyForm = ({ email }: VerifyFormProps) => {
  const isLoading = useVerifyStore((state) => state.isLoading)
  const methods = useVerify(email)
  const { 
    control, 
    handleSubmit, 
    onSubmit, 
    formState: { errors }, 
    clearErrors, 
  } = methods

  // Retrieve stored timer and resend state from localStorage
  const storedTimer = Number(localStorage.getItem('otpTimer')) || 60
  const storedResendState = JSON.parse(localStorage.getItem('isResendDisabled') || 'false')
  
  const [timer, setTimer] = useState<number>(storedTimer)  // Timer state to track countdown
  const [isResendDisabled, setResendDisabled] = useState<boolean>(storedResendState)
  const [ isResending, setIsResending ] = useState<boolean>(false)

  const mutation = useMutation({
    onMutate: () => {
      setIsResending(true)
    },
    mutationFn: async () => {
      await resendOtp(email)
    },
    onSuccess: () => {
      setTimer(60)
      setResendDisabled(true)
    },
    onSettled: () => {
      setIsResending(false)
    }
  });

  useEffect(() => {
    // Save timer and resend state to localStorage
    localStorage.setItem('otpTimer', String(timer))
    localStorage.setItem('isResendDisabled', JSON.stringify(isResendDisabled))

    let interval: number
    if (isResendDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1)
      }, 1000)
    } else if (timer === 0) {
      setResendDisabled(false) // Enable Resend OTP button after timer reaches 0
    }

    // Clean up interval on component unmount or when timer reaches 0
    return () => clearInterval(interval)

  }, [timer, isResendDisabled]);

  return (
    <form 
      className="w-[20rem] flex-col flex items-start justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl font-medium tracking-tight text-gray-700">Verify your account</h1>
      <p className="text-sm text-gray-500 mt-6">
        We have sent a One Time Password to your email. Please enter the code to verify your account.
      </p>

      <Label className="mt-4 mb-2">OTP</Label>
      <Controller 
        name="otp"
        control={control}
        render={({ field: { onChange } }) => (
          <OTPInput
            onChange={(value) => {
              onChange(value)
              clearErrors('otp')
            }}
            didError={!!errors?.otp}
          />
        )}
      />
      <ErrorMessage message={errors?.otp?.message} />

      <Button 
        variant={isLoading ? "disabled" : "primary"}
        disabled={isLoading}
        className="w-full mt-6" 
        type="submit"
      >
        Verify
      </Button>

      <p className="text-sm text-gray-500 mt-6">
        Didn't receive the code? {" "}
        <button 
          className={`${isResendDisabled || isResending ? " text-gray-500 cursor-not-allowed " : "text-lime-500 "} font-medium`}
          onClick={() => mutation.mutate()}
          type="button"
          disabled={isResendDisabled || isResending}  // Disable the resend button when timer is running
        > 
          {isResendDisabled || isResending ? `Resend OTP in ${timer}s` : 'Resend OTP'}
        </button>
      </p>
    </form>
  )
}

export default VerifyForm
