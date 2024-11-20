import LoginForm from "@features/guest/authentication/login/components/forms/LoginForm"
import LandingLayout from "@layouts/LandingLayout"

const LoginPage = () => {
  return (
    <LandingLayout>
      <section className="w-full h-full flex min-h-screen   pt-52 md:pt-20 xl:pt-0 items-start xl:items-center justify-center overflow-y-scroll gap-12 overflow-x-hidden">
        <LoginForm />
      </section>
    </LandingLayout>
  )
}

export default LoginPage
