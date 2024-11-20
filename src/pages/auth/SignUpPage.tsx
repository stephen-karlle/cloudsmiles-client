
import { FormProvider } from "react-hook-form"
import { useSignUpStore } from "@features/guest/authentication/signup/stores/useSignUpStore"
import LandingLayout from "@layouts/LandingLayout"
import CredentialStep from "@features/guest/authentication/signup/components/steps/CredentialStep"
import InformationStep from "@features/guest/authentication/signup/components/steps/InformationStep"
import useSignUp from "@features/guest/authentication/signup/hooks/useSignUp"

const SignUpPage = () => {

  const activeTab = useSignUpStore((state) => state.activeTab)
  
  const methods = useSignUp()
  const { handleSubmit, onSubmit } = methods



  return (
    <LandingLayout>
      <FormProvider {...methods}>
        <form 
          className="w-full h-full flex  items-center justify-center overflow-y-scroll gap-12 overflow-x-hidden"
          onSubmit={handleSubmit(onSubmit)}
        >
          {activeTab === "Credential" && <CredentialStep />}
          {activeTab === "Information" && <InformationStep />}
        </form>
      </FormProvider>
    </LandingLayout>
  )
}

export default SignUpPage
