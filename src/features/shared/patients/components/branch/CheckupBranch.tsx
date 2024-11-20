import { useState } from "react"
import { motion } from "framer-motion"
import { usePatientStore } from "../../stores/patient.store"
import ToothOdontogram from "../odontogram/ToothOdontogram"
import CheckupCard from "../cards/CheckupCard"
import SectionOdontogram from "../odontogram/SectionOdontogram"
import GeneralOdontogram from "../odontogram/GeneralOdontogram"

const CheckupBranch = () => {
  const [activeStep, setActiveStep] = useState<string>("Tooth")
  const checkups = usePatientStore((state) => state.checkups)
  const selectedService = usePatientStore((state) => state.selectedService)
  const setSelectedService = usePatientStore((state) => state.setSelectedService)
  const setCheckups = usePatientStore((state) => state.setCheckups)
  const profile = usePatientStore((state) => state.selectedProfile)

  const getToothName = (toothNumber: number | string, name: string) => {
    const number = parseInt(toothNumber.toString())
    switch (true) {
      case (number >= 11 && number <= 19):
        return `Maxillary Left ${name}`
      case (number >= 21 && number <= 29):
        return `Maxillary Right ${name}`
      case (number >= 31 && number <= 39):
        return `Mandibular Right ${name}`
      case (number >= 41 && number <= 49):
        return `Mandibular Left ${name}`
      default:
        return null
    }
  }  

  const getSectionType = (type: string | number) => {
    switch (type) {
      case "Maxilla":
        return "Maxillary Section (Upper Jaw)"
      case "Mandible":
        return "Mandibular Section (Lower Jaw)"
      default:
        return ""
    }
  }

  const handleSelectService = (service: string) => {
    setActiveStep(service)
    setSelectedService({ id: 0, name: "", type: service })
    setCheckups([])
    if (service === "General") {
      const generalCheckups = profile.checkupData.filter((checkup) => checkup.checkupType === "General")
      setCheckups(generalCheckups)
      setSelectedService({
        id: "General",
        type: "General",
        name: "General Tooth Treatments",
      })
    }
  }

  return (
    <article className="w-full h-full flex flex-col p-6 gap-6 overflow-hidden">
      <header className="w-full h-fit flex items-center justify-start gap-4">
        <label className="text-gray-700 text-xl font-medium">Service</label>
        <div className="relative flex items-center justify-center bg-gray-50 w-fit rounded-md p-1 h-8 flex-shrink-0">
          <motion.div
            className="absolute w-20 h-7 bg-white rounded-md shadow-md shadow-gray-200"
            initial={false}
            animate={{ x: activeStep === "Tooth" ? -82 : activeStep === "Section" ? "0%" : "101%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <button
            className={`z-10 min-w-20 h-full text-sm transition-all duration-300 ease-in-out ${activeStep === "Tooth" ? "text-lg" : "text-gray-500 font-normal"}`}
            onClick={() => handleSelectService("Tooth")}
            type="button"
          >
            Tooth
          </button>
          <button
            className={`z-10 min-w-20 h-full text-sm transition-all duration-300 ease-in-out ${activeStep === "Section" ? "text-lg" : "text-gray-500 font-normal"}`}
            onClick={() => handleSelectService("Section")}
            type="button"
          >
            Section
          </button>
          <button
            className={`z-10 min-w-20 h-full text-sm transition-all duration-300 ease-in-out ${activeStep === "General" ? "text-lg" : "text-gray-500 font-normal"}`}
            onClick={() => handleSelectService("General")}
            type="button"
          >
            General
          </button>
        </div>
      </header>
      <section className="w-full h-full grid grid-cols-[25%_auto] rounded-md ring-1 ring-gray-200 overflow-hidden">
        <div className="w-full h-full border-r border-gray-200 flex flex-col gap-4 items-center justify-center">
          <h1 className="text-gray-700 text-xl font-medium">Odontogram</h1>
          {activeStep === "Tooth" && <ToothOdontogram />}
          {activeStep === "Section" && <SectionOdontogram />}
          {activeStep === "General" && <GeneralOdontogram />}
        </div>

        <div className="w-full flex flex-col p-6 overflow-y-scroll">

          {checkups.length === 0 && selectedService.id === 0 && (
            <h1 className="text-gray-700 text-xl font-medium">
              {selectedService.type === "Section" && "Section Treatments"}
              {selectedService.type === "Tooth" && "Tooth Treatments"}
            </h1>
          )}
          {selectedService.id !== 0 ? (
            <div className="flex items-center gap-4 mb-8">
              {["Tooth", "Section"].includes(activeStep) && (
                <span
                  className={`w-fit px-2 h-5 uppercase rounded-md ring-1 text-xs flex items-center justify-center ${
                    activeStep === "Tooth" ? "ring-lime-500 text-lime-500" : "ring-purple-500 text-purple-500"
                  }`}
                >
                  {selectedService.id}
                </span>
              )}
              <h1 className="text-gray-700 text-xl font-medium">
                {getToothName(selectedService.id, selectedService.name)}
                {getSectionType(selectedService.id)}
                {selectedService.type === "General" && " General Treatments"}
              </h1>
            </div>
          ) : (
            activeStep !== "General" && selectedService.id === 0 && (
              <div className="flex flex-col items-center justify-center h-full w-full">
                <h1 className="text-xl font-medium text-gray-700">
                  No selected {activeStep === "Tooth" ? "tooth" : "section"}
                </h1>
                <p className="text-gray-500 text-sm">
                  {activeStep === "Tooth" ? "Select a tooth to view details here" : "Select a section to view details here"}
                </p>
              </div>
            )
          )}

          {checkups.length > 0 ? (
            checkups.map((checkup, index) => (
              <CheckupCard key={index} checkup={checkup} isLast={index === checkups.length - 1} />
            ))
          ) : (
            selectedService.type && selectedService.id !== 0 && (
              <div className="flex flex-col items-center justify-center h-full w-full">
                <h1 className="text-xl font-medium text-gray-700">
                  No checkups available
                </h1>
                <p className="text-gray-500 text-sm">
                  Add a checkup to view details here
                </p>
              </div>
            )
          )}
        </div>
      </section>
    </article>
  )
}

export default CheckupBranch
