import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Controller, useFormContext } from 'react-hook-form'
import { useSignUpStore } from '../../stores/useSignUpStore';
import { validateEmail } from '../../services/signup.services';

import Button from '@components/ui/Button'
import Input from '@components/ui/Input'
import PasswordInput from '@components/ui/PasswordInput'
import ErrorMessage from '@components/ui/ErrorMessage'
import PasswordStrengthIndicator from '@components/shared/PasswordStrengthIndicator';
import { useMutation } from '@tanstack/react-query';

const CredentialStep = () => {
  const { 
    clearErrors, 
    control, 
    formState: { errors }, 
    trigger, 
    getValues, 
    setError, 
    watch
  } = useFormContext()

  const [ toggle, setToggle ] = useState(false)
  const setActiveTab = useSignUpStore((state) => state.setActiveTab)
  const setIsLoading = useSignUpStore((state) => state.setIsLoading)
  const isLoading = useSignUpStore((state) => state.isLoading)

  const password = watch('credentialData.credentialPassword')
  const confirmPassword = watch('credentialData.credentialConfirmPassword')

  const mutation = useMutation({
    mutationFn: async (data: string) => {
      const token = await validateEmail(data);
      return token;
    },
    onSuccess: () => {
      setActiveTab('Information');
    },
    onError: () => {
      setError('credentialData.credentialEmail', {
        type: 'manual',
        message: 'Email is already taken',
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });
  
  const handleNext = async () => {
    const isValid = await trigger(['credentialData']);
    const email = getValues('credentialData.credentialEmail');
    
    if (!isValid) {
      return; // Prevent mutation if validation fails
    }
  
    if (password !== confirmPassword) {
      setError('credentialData.credentialConfirmPassword', {
        type: 'manual',
        message: 'Passwords do not match',
      });
      return; // Prevent mutation if passwords do not match
    }
  
    mutation.mutate(email); 
  };

  const formErrors = errors.credentialData as any

  return (
    <section className="w-[20rem] flex-col flex items-start justify-center ">
      <h1 className="text-2xl font-medium tracking-tight text-gray-700">Sign Up</h1>
      <p className="text-sm text-gray-500 mt-1 text-center">Become a member to experience the best dental care</p>
      <label className="text-sm text-gray-700 mt-4">Email Address</label>
      <Controller
        name="credentialData.credentialEmail"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <Input
            value={value}
            type="text"
            className="w-full mt-2" 
            placeholder="mail@example.com"
            onChange={(e) => {
              onChange(e);
              clearErrors('credentialData.credentialEmail');
            }}
            // isDisabled={isLoading}
            didError={!!formErrors?.credentialEmail?.message}
          />
        )}
      />
      <ErrorMessage message={formErrors?.credentialEmail?.message} />
      
      <div className="flex flex-col w-full items-start justify-start">
        <label className="text-sm text-gray-700 mt-4">Phone Number</label>
        <Controller
          name="credentialData.credentialPhoneNumber"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <Input
              onlyNumbers
              value={value}
              type="text"
              className="w-full mt-2" 
              placeholder="09123456789"
              maxLength={11}
              onChange={(e) => {
                onChange(e);
                clearErrors('credentialData.credentialPhoneNumber');
              }}
              // isDisabled={isLoading}
              didError={!!formErrors?.credentialPhoneNumber?.message}
            />
          )}
        />      
        <ErrorMessage message={formErrors?.credentialPhoneNumber?.message} />
      </div>


      <label className="text-sm text-gray-700 mt-4">Password</label>
      <Controller
        name="credentialData.credentialPassword"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <PasswordInput
            value={value}
            className="w-full mt-2" 
            toggle={toggle} 
            setToggle={setToggle}
            onChange={(e) => {
              onChange(e);
              clearErrors('credentialData.credentialPassword');
            }}
            // isDisabled={isLoading}
            didError={!!formErrors?.credentialPassword?.message}
          />            
        )}
      />  

      {password && (
        <PasswordStrengthIndicator password={password} />
      )}

      <ErrorMessage message={formErrors?.credentialPassword?.message} />
      <label className="text-sm text-gray-700 mt-4">Confirm Password</label>
      <Controller
        name="credentialData.credentialConfirmPassword"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <PasswordInput
            value={value}
            className="w-full mt-2" 
            toggle={toggle} 
            setToggle={setToggle}
            onChange={(e) => {
              onChange(e);
              clearErrors('credentialData.credentialConfirmPassword');
            }}
            // isDisabled={isLoading}
            didError={!!formErrors?.credentialConfirmPassword?.message}
          />            
        )}
      />        
      <ErrorMessage message={formErrors?.credentialConfirmPassword?.message} />
      <Button 
        className="w-full mt-8" 
        type="button" 
        onClick={handleNext}
        disabled={isLoading}
        variant={isLoading ? 'disabled' : 'primary'}
      >Next
      </Button>
      <p className="text-sm text-gray-500 mt-4 w-full text-center">Already have an account? <Link to="/login" className="text-lime-500">Login</Link></p>

    </section>
  )
}

export default CredentialStep
