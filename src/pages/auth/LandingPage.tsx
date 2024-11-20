import Hero from "@features/guest/hero/components/Hero"
import QualityPromises from "@features/guest/hero/components/QualityPromises"
import Footer from "@features/guest/hero/components/Footer"
import LandingLayout from "src/layouts/LandingLayout"

const LandingPage = () => {

  return (
    <LandingLayout>
      <section className="w-full h-full flex flex-col items-center justify-start overflow-y-scroll gap-12 overflow-x-hidden">
        <Hero />
        {/* <Payments /> */}
        <QualityPromises />
        {/* <Services />
        <Dentists />
        <Reviews /> */}
        <Footer />
      </section>
    </LandingLayout>
  )
}

export default LandingPage
