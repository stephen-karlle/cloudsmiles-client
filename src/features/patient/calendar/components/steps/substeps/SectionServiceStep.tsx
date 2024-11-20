import { MouseEvent, useState } from "react";
import { SectionCheckupResponseType } from "@features/shared/calendar/types/appointment.types";
import { sectionOdontogramConstants } from "@features/shared/calendar/constants/odontogram.constants";
import Label from "@components/ui/Label";
import CheckIcon from "@icons/linear/CheckIcon";
import HourGlassIcon from "@icons/linear/HourGlassIcon";

export type SectionTreatmentStep = {
  sectionCheckups: SectionCheckupResponseType[]
}

const SectionTreatmentStep = ({
  sectionCheckups
}: SectionTreatmentStep) => {

  const [selectedSection, setSelectedSection ] = useState<string>("")



  const selectedTreatment = sectionCheckups.find((checkup) => checkup.sectionName === selectedSection);
  const sectionName = sectionOdontogramConstants.find((section) => section.id === selectedSection)?.id


  const handleSectionClick = (section: string, event: MouseEvent) => {
    event.stopPropagation()
    setSelectedSection(section)
  }
  
  return (
    <section className="flex items-center justify-between h-full flex-col w-full gap-6">
      <div className="w-[90%] h-[24rem] flex items-center justify-center relative transition-colors duration-500 ease-in-out">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 315" fill="none" className="w-full h-full">
          {sectionOdontogramConstants.map((section, index) => {
            const hasTreatment = sectionCheckups.some((checkup) => checkup.sectionName === section.id);
            const isSeleted = selectedSection ? selectedSection === section.id : false

            return (
              <g key={index}>
                <path
                  key={`${index}-center`}
                  d={section.center}
                  strokeLinecap="round"
                  onClick={(event) => handleSectionClick(section.id, event)}
                  className={`cursor-pointer 
                    ${isSeleted ? 'z-10 stroke-1 stroke-purple-500 fill-purple-100 ' : 
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
                  onClick={(event) => handleSectionClick(section.id, event)}
                  className={`stroke-gray-400 stroke-1 
                    ${isSeleted ? " z-10 stroke-purple-500 " : (hasTreatment && 'z-10 stroke-violet-500')}
                  `}
                />
                <path
                  key={`${index}-outer`}
                  d={section.outer}
                  strokeLinecap="round"
                  className={`
                    ${isSeleted ? " z-10 stroke-white" : (hasTreatment && 'z-10 stroke-1 stroke-violet-500 ')}
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
      {selectedTreatment && (
        <div className="w-full h-fit p-6 gap-4 flex flex-col">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-medium text-gray-700">
                {sectionName}
              </h1>
              <span className="text-xs text-purple-500 ring-1 px-2 h-5 flex items-center justify-center rounded-md uppercase ring-purple-500">
                {selectedTreatment.sectionName}
              </span>
            </div>
            <Label>
              {selectedTreatment.sectionTreatmentPlans.length} Treatment{selectedTreatment.sectionTreatmentPlans.length > 1 && "s"}
            </Label>
          </div>
          <div className="flex flex-col gap-4">
            {selectedTreatment.sectionTreatmentPlans.map((treatment, index) => (
              <div key={index} className="flex items-start justify-between gap-2 ring-1 ring-gray-200 rounded-md p-4 ">
                <div className="flex flex-col w-full h-full">
                  <h1 className="text-md font-medium text-gray-700">
                    {treatment.sectionTreatmentId.treatmentName}
                  </h1>
                  <label className="text-gray-500">
                    {treatment.sectionCondition}
                  </label>
                </div>
                {treatment.sectionStatus === "Approved" ? (
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

export default SectionTreatmentStep