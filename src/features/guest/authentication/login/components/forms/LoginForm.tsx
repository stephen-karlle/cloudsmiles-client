import { Link } from 'react-router-dom'
import { Controller } from 'react-hook-form'
import { useState } from 'react'
import Button from '@components/ui/Button'
import Input from '@components/ui/Input'
import PasswordInput from '@components/ui/PasswordInput'
import useLogin from '../../hooks/useLogin'
import ErrorMessage from '@components/ui/ErrorMessage'
import { useAuthStore } from '../../stores/auth.store'


const LoginForm = () => {

  const isLoading = useAuthStore((state) => state.isLoading)
  const [ toggle, setToggle ] = useState(false)

  const methods = useLogin()
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
      <h1 className="text-2xl font-medium tracking-tight text-gray-700">Login</h1>
      <p className="text-sm text-gray-500 mt-2">Welcome to VS Dental — You will experience the best dental care</p>
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
      <label className="text-sm text-gray-700 mt-4">Password</label>
      <Controller 
        name="password"
        control={control}
        render={({ field: { onChange, value} }) => (
          <PasswordInput 
            value={value}
            onChange={(e) =>{
              onChange(e.target.value)
              clearErrors("password")
            }}
            className="w-full mt-2" 
            toggle={toggle} 
            setToggle={setToggle}
            didError={!!errors?.password}
          />
        )}
      />
      <ErrorMessage message={errors?.password?.message} />
      <Link to="/recovery" className="text-gray-500 text-sm mt-2 mb-4">Forgot Password?</Link>
      <Button 
        className="w-full mt-4" 
        type="submit"
        variant={isLoading ? "disabled" : "primary"}
        disabled={isLoading}
        onClick={() => {}}
      >
        Login
      </Button>
      <p className="text-sm text-gray-500 mt-8 w-full text-center">Don't have an account? <Link to="/signup" className="text-lime-500">Sign Up</Link></p>

    </form>
  )
}

export default LoginForm
