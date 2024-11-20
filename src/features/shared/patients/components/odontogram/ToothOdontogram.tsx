import { MouseEvent } from 'react'
import { toothOdontogramConstants } from '@features/shared/calendar/constants/odontogram.constants'
import { usePatientStore } from '../../stores/patient.store'
import { SelectedToothType } from '@features/shared/calendar/types/store.types'

const ToothOdontogram = () => {

  const profile = usePatientStore((state) => state.selectedProfile)
  const setCheckups = usePatientStore((state) => state.setCheckups)
  const selectedService = usePatientStore((state) => state.selectedService)
  const setSelectedService = usePatientStore((state) => state.setSelectedService)


  const checkups = profile.checkupData || []

  const handleToothClick = (tooth: SelectedToothType, event: MouseEvent) => {
    event.preventDefault()
    const toothCheckups = checkups.filter((checkup) => checkup.checkupToothNumber === tooth.id)
    setCheckups(toothCheckups)
    setSelectedService({
      id: tooth.id,
      type: "Tooth",
      name: tooth.name,
    })
  }

  return (
    <div className="w-[90%] h-[24rem] flex items-center justify-center relative transition-colors duration-500 ease-in-out">
      
      
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 315" fill="none" className="w-full h-full">
        {toothOdontogramConstants.map((tooth, index) => {
          const hasTreatment = checkups.some((checkup) => checkup.checkupToothNumber === tooth.id);
          const isSelected = selectedService.id === tooth.id;


          return (
            <g key={index}>
              <path
                key={`${index}-center`}
                d={tooth.center}
                strokeLinecap="round"
                onClick={(event) => handleToothClick(tooth, event)}
                className={`cursor-pointer 
                  ${isSelected ? 'z-10 stroke-1 stroke-green-500 fill-green-200 ' : 
                    (
                      hasTreatment 
                      ? ' z-10 stroke-2 stroke-white fill-lime-200 ' 
                      : "fill-white stroke-gray-400 stroke-1"
                    )
                  }
                `}
              />
              <path
                key={`${index}-inner`}
                d={tooth.inner}
                strokeLinecap="round"
                onClick={(event) => handleToothClick(tooth, event)}
                className={`stroke-gray-400 stroke-1 
                  ${isSelected ? " z-10 stroke-green-500 " : (hasTreatment && 'z-10 stroke-lime-500')}
                `}
              />
              <path 
                key={`${index}-outer`}
                d={tooth.outer}
                strokeLinecap="round"
                className={`
                  ${isSelected ? " z-10 stroke-white" : (hasTreatment && 'z-10 stroke-1 stroke-lime-500 ')}
                `}
              />
              <path
                key={`${index}-number`}
                d={tooth.number}
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

export default ToothOdontogram