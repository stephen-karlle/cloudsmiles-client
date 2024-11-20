import { useViewAppointmentStore } from "@features/shared/calendar/stores/appointment.stores";
import { ToothCheckupType } from "@features/shared/calendar/types/appointment.types";
import { MouseEvent, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { toothOdontogramConstants } from "@features/shared/calendar/constants/odontogram.constants";
import AddToothTreatmentsSheet from "../../../sheets/AddToothTreatmentsSheet";

type SelectedToothType = {
  id: number,
  name: string,
}

const ToothSectionStep = () => {

  const setViewActiveSheets = useViewAppointmentStore((state) => state.setViewActiveSheets)
  const [ selectedTooth, setSelectedTooth ] = useState<SelectedToothType | null>(null)
  const { control, watch } = useFormContext();

  const { append: appendToothCheckup } = useFieldArray({
    control,
    name: "checkupData.toothCheckup",
  });


  const toothCheckups = watch("checkupData.toothCheckup") as ToothCheckupType[];

  const handleToothClick = (tooth: SelectedToothType, event: MouseEvent) => {
    setSelectedTooth(tooth);
    event.preventDefault();
    const alreadyExists = toothCheckups.some((checkup) => checkup.toothNumber === tooth.id) 
    && toothCheckups.some((checkup) => checkup.toothTreatmentPlans.length > 0);
    if (!alreadyExists) {
      appendToothCheckup({
        toothNumber: tooth.id,
        toothTreatmentPlans: [],
      });
    }
    setViewActiveSheets((prev) => [
      ...prev,
      {
        name: "ExtraSheet2",
        component: <AddToothTreatmentsSheet 
          selectedTooth={tooth}
          setSelectedTooth={setSelectedTooth}
        />,
      },
    ]);
  };



  return (
    <section className="flex items-center justify-between h-full flex-col w-full gap-6">
      <div className="w-[90%] h-[24rem] flex items-center justify-center relative transition-all duration-700 ease-in-out">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 315" fill="none" className="w-full h-full">
          {toothOdontogramConstants.map((tooth, index) => {
            const hasTreatment = toothCheckups.some((checkup) => checkup.toothNumber === tooth.id);
            const isSeleted = selectedTooth ? selectedTooth.id === tooth.id : false


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
      {/* <div className="flex items-center justify-evenly w-full max-w-[32rem] h-20">
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-rose-500 rounded-sm" />
          <label className="text-xs text-gray-700">Recent Findings</label>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-lime-500 rounded-sm" />
          <label className="text-xs text-gray-700">Has treatment before</label>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-amber-500 rounded-sm" />
          <label className="text-xs text-gray-700">Recommended to be treated</label>
        </div>
      </div> */}
    </section>
  );
};

export default ToothSectionStep;