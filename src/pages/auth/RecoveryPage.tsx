import RecoveryForm from "@features/guest/authentication/recovery/components/forms/RecoveryForm"
import SuccessForm from "@features/guest/authentication/recovery/components/forms/SuccessForm"
import { useRecoveryStore } from "@features/guest/authentication/recovery/stores/recovery.store"
import LandingLayout from "@layouts/LandingLayout"

const RecoveryPage = () => {
  const isSuccess = useRecoveryStore((state) => state.isSuccess)
  return (
    <LandingLayout>
      <section className="w-full h-full flex min-h-screen   pt-52 md:pt-20 xl:pt-0 items-start xl:items-center justify-center overflow-y-scroll gap-12 overflow-x-hidden">
        {isSuccess ? (
          <SuccessForm />
        ) :(
          <RecoveryForm />
        )}

      </section>
    </LandingLayout>
  )
}

export default RecoveryPage
