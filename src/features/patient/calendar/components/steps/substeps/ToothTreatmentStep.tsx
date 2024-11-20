import Label from "@components/ui/Label";
import { toothOdontogramConstants } from "@features/shared/calendar/constants/odontogram.constants";
import { MouseEvent, useState } from "react";
import { ToothCheckupResponseType } from "@features/shared/calendar/types/appointment.types";
import CheckIcon from "@icons/linear/CheckIcon";
import HourGlassIcon from "@icons/linear/HourGlassIcon";

type SelectedToothType = {
  id: number,
  name: string,
}

type ToothTreatmentStepProps = {
  toothCheckups: ToothCheckupResponseType[]
}

const ToothTreatmentStep = ({
  toothCheckups
}: ToothTreatmentStepProps) => {

  const [selectedTooth, setSelectedTooth ] = useState<number>()

  const handleToothClick = (tooth: SelectedToothType, event: MouseEvent) => {
    event.stopPropagation()
    setSelectedTooth(tooth.id)

  };

  const selectedTreatment = toothCheckups.find((checkup) => checkup.toothNumber === selectedTooth)
  const toothName = toothOdontogramConstants.find((tooth) => tooth.id === selectedTooth)?.name


  return (
    <section className="flex flex-col items-center justify-start h-full  w-full ">
      <div className="w-[90%] h-[24rem] flex items-center justify-center relative transition-all duration-700 ease-in-out">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 315" fill="none" className="w-full h-full">
          {toothOdontogramConstants.map((tooth, index) => {
            const hasTreatment = toothCheckups.some((checkup) => checkup.toothNumber === tooth.id);
            const isSeleted = selectedTooth ? selectedTooth === tooth.id : false


            return (
              <g key={index}>
                <path
                  key={`${index}-center`}
                  d={tooth.center}
                  strokeLinecap="round"
                  onClick={(event) => handleToothClick(tooth, event)}
                  className={`cursor-pointer 
                    ${isSeleted ? 'z-10 stroke-1 stroke-green-500 fill-green-200 ' : 
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
                    ${isSeleted ? " z-10 stroke-green-500 " : (hasTreatment && 'z-10 stroke-lime-500')}
                  `}
                />
                <path
                  key={`${index}-outer`}
                  d={tooth.outer}
                  strokeLinecap="round"
                  className={`
                    ${isSeleted ? " z-10 stroke-white" : (hasTreatment && 'z-10 stroke-1 stroke-lime-500 ')}
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
      {selectedTreatment && (
        <div className="w-full h-fit p-6 gap-4 flex flex-col">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-medium text-gray-700">
                {toothName}
              </h1>
              <span className="text-xs text-lime-500 ring-1 px-2 h-5 flex items-center justify-center rounded-md ring-lime-500">
                {selectedTreatment.toothNumber}
              </span>
            </div>
            <Label>
              {selectedTreatment.toothTreatmentPlans.length} Treatment{selectedTreatment.toothTreatmentPlans.length > 1 && "s"}
            </Label>
          </div>
          <div className="flex flex-col gap-4">
            {selectedTreatment.toothTreatmentPlans.map((treatment, index) => (
              <div key={index} className="flex items-start justify-between gap-2 ring-1 ring-gray-200 rounded-md p-4 ">
                <div className="flex flex-col w-full h-full">
                  <h1 className="text-md font-medium text-gray-700">
                    {treatment.toothTreatmentId.treatmentName}
                  </h1>
                  <label className="text-gray-500">
                    {treatment.toothCondition}
                  </label>
                </div>
                {treatment.toothStatus === "Approved" ? (
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
  );
};

export default ToothTreatmentStep;