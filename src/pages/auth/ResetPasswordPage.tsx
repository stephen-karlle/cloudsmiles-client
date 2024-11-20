import ResetPasswordForm from "@features/guest/authentication/recovery/components/forms/ResetPasswordForm"
import { VerifyRecoveryToken } from "@features/guest/authentication/recovery/services/recovery.services"
import RestrictedPage from "@pages/utils/RestrictedPage"
import { useQuery } from "@tanstack/react-query"

const ResetPasswordPage = () => {

  const token = new URLSearchParams(window.location.search).get("token")

  const { data, isError, isLoading, isPending, isFetching } = useQuery({
    queryKey: ["recoveryTokenData", token], 
    queryFn: () => VerifyRecoveryToken(token), 
    retry: false, 
    staleTime: 0,

  })

  if (isLoading || isPending || isFetching) {
    return <div>Loading...</div>
  }

  if (!data || !token || isError)  return <RestrictedPage />
  
  return (
    <section className="w-full h-full flex min-h-screen pt-52 md:pt-20 xl:pt-0 items-start xl:items-center justify-center overflow-y-scroll gap-12 overflow-x-hidden">
      <ResetPasswordForm token={token} />
    </section>
  )
}

export default ResetPasswordPage
