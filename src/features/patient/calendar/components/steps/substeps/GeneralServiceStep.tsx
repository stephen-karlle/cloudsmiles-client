import Label from '@components/ui/Label'
import { toothOdontogramConstants } from '@features/shared/calendar/constants/odontogram.constants'
import { GeneralCheckupResponseType } from '@features/shared/calendar/types/appointment.types'
import CheckIcon from '@icons/linear/CheckIcon'
import HourGlassIcon from '@icons/linear/HourGlassIcon'


type GeneralTreatmentStepProps = {
  generalCheckups: GeneralCheckupResponseType[]
}
const GeneralTreatmentStep = ({
  generalCheckups
}: GeneralTreatmentStepProps ) => {


  const hasTreatment = generalCheckups.length > 0

  return (
    <section className="flex items-center justify-between h-full flex-col w-full gap-6">
      <div className="w-[90%] h-[24rem] flex items-center justify-center relative transition-colors duration-500 ease-in-out">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 315" fill="none" className="w-full h-full">
          {toothOdontogramConstants.map((tooth, index) => {
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
      {generalCheckups.length > 0 && (
        <div className="w-full h-fit p-6 gap-4 flex flex-col">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-medium text-gray-700">
                Additional Treatments
              </h1>
            </div>
            <Label>
              {generalCheckups.length} Treatment{generalCheckups.length > 1 && "s"}
            </Label>
          </div>
          <div className="flex flex-col gap-4">
            {generalCheckups.map((treatment, index) => (
              <div key={index} className="flex items-start justify-between gap-2 ring-1 ring-gray-200 rounded-md p-4 ">
                <div className="flex flex-col w-full h-full">
                  <h1 className="text-md font-medium text-gray-700">
                    {treatment.generalTreatmentId.treatmentName}
                  </h1>
                  <label className="text-gray-500">
                    {treatment.generalNotes}
                  </label>
                </div>
                {treatment.generalStatus === "Approved" ? (
                  <div className=" flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 stroke-2 stroke-green-500"/>
                    <label className="text-sm text-green-500 font-normal">
                      Approved
                    </label>
                  </div>
                ): (
                  <div className=" flex items-center gap-2">
                    <HourGlassIcon className="w-4 h-4 stroke-2 stroke-amber-500"/>
                    <label className="text-sm text-amber-500 font-normal">
                      Recommended
                    </label>
                  </div>
                )}              
            </div>
            ))}
          </div>
        </div>  
      )}
    </section>
  )
}

export default GeneralTreatmentStep