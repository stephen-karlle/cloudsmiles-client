import VerifyForm from "@features/guest/authentication/verify/components/VerifyForm"
import { verifyLoginToken } from "@features/guest/authentication/verify/services/verify.services"
import RestrictedPage from "@pages/utils/RestrictedPage"
import { useQuery } from "@tanstack/react-query"


const VerifyPage = () => {
  const token = new URLSearchParams(window.location.search).get("token")

  const { data, isError, isLoading, isPending, isFetching } = useQuery({
    queryKey: ["loginTokenData", token],
    queryFn: () => verifyLoginToken(token), 
    retry: false, 
    staleTime: 0,
  })

  if (isLoading || isPending || isFetching) {
    return <div>Loading...</div>
  }

  if (!data || isError)  return <RestrictedPage />
  
  return (
    <section className="w-full h-full flex min-h-screen pt-52 md:pt-20 xl:pt-0 items-start xl:items-center justify-center overflow-y-scroll gap-12 overflow-x-hidden">
      <VerifyForm email={data} />
    </section>  
  )
}

export default VerifyPage
