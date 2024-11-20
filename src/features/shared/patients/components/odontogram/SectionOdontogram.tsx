import { sectionOdontogramConstants, } from '@features/shared/calendar/constants/odontogram.constants'
import { usePatientStore } from '../../stores/patient.store'
import { SelectedSectionType } from '@features/shared/calendar/components/steps/dental_checkup/substep/SectionServiceStep'

const SectionOdontogram = () => {

  const profile = usePatientStore((state) => state.selectedProfile)
  const setCheckups = usePatientStore((state) => state.setCheckups)
  const selectedService = usePatientStore((state) => state.selectedService)
  const setSelectedService = usePatientStore((state) => state.setSelectedService)


  const checkups = profile.checkupData || []

  const handleSectionClick = (section: SelectedSectionType) => {
    const sectionCheckups = checkups.filter((checkup) => checkup.checkupSection === section.id)
    setCheckups(sectionCheckups)
    setSelectedService({
      id: section.id,
      type: "Section",
      name: section.id === "Maxilla" ? "Maxilla" : "Mandible",
    })
  }

  return (
    <div className="w-[90%] h-[24rem] flex items-center justify-center relative transition-colors duration-500 ease-in-out">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 315" fill="none" className="w-full h-full">
      {sectionOdontogramConstants.map((section, index) => {
        const hasTreatment = checkups.some((checkup) => checkup.checkupSection === section.id);
        const isSelected = selectedService.id === section.id;

        return (
          <g key={index}>
            <path
              key={`${index}-center`}
              d={section.center}
              strokeLinecap="round"
              onClick={() => handleSectionClick(section)}
              className={`cursor-pointer 
                ${isSelected ? 'z-10 stroke-1 stroke-purple-500 fill-purple-100 ' : 
                  (
                    hasTreatment 
                    ? ' z-10 stroke-2 stroke-white fill-violet-200 ' 
                    : "fill-white stroke-gray-400 stroke-1"
                  )
                }
              `}
            />
            <path
              key={`${index}-inner`}
              d={section.inner}
              strokeLinecap="round"
              onClick={() => handleSectionClick(section)}
              className={`stroke-gray-400 stroke-1 
                ${isSelected ? " z-10 stroke-purple-500 " : (hasTreatment && 'z-10 stroke-violet-500')}
              `}
            />
            <path
              key={`${index}-outer`}
              d={section.outer}
              strokeLinecap="round"
              className={`
                ${isSelected ? " z-10 stroke-white" : (hasTreatment && 'z-10 stroke-1 stroke-violet-500 ')}
              `}
            />
            <path
              key={`${index}-number`}
              d={section.number}
              strokeLinecap="round"
              className={`
                ${hasTreatment ? 'fill-gray-950' : "fill-gray-400"}
              `}
            />
          </g>
        );
      })}
    </svg>
  </div>
  )
}

export default SectionOdontogram