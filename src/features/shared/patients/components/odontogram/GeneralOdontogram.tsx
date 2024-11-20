import { toothOdontogramConstants } from '@features/shared/calendar/constants/odontogram.constants'
import { usePatientStore } from '../../stores/patient.store'

const GeneralOdontogram = () => {

  const profile = usePatientStore((state) => state.selectedProfile)
  const checkups = profile.checkupData || []

  return (
    <div className="w-[90%] h-[24rem] flex items-center justify-center relative transition-colors duration-500 ease-in-out">
      
      
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 315" fill="none" className="w-full h-full">
        {toothOdontogramConstants.map((tooth, index) => {
          const hasTreatment = checkups.some((checkup) => checkup.checkupType === "General");

          return (
            <g key={index}>
              <path
                key={`${index}-center`}
                d={tooth.center}
                strokeLinecap="round"
                className={`
                  ${
                    hasTreatment 
                    ? ' z-10 stroke-2 stroke-white fill-indigo-200 ' 
                    : "fill-white stroke-gray-400 stroke-1"
                  }
                `}
              />
              <path
                key={`${index}-inner`}
                d={tooth.inner}
                strokeLinecap="round"
                className={`stroke-gray-400 stroke-1 
                  ${hasTreatment && 'z-10 stroke-indigo-500'}
                `}
              />
              <path 
                key={`${index}-outer`}
                d={tooth.outer}
                strokeLinecap="round"
                className={`
                  ${hasTreatment && 'z-10 stroke-1 stroke-indigo-500 '}
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

export default GeneralOdontogram