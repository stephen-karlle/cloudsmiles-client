import { useViewAppointmentStore } from "@features/shared/calendar/stores/appointment.stores";
import { SectionCheckupType } from "@features/shared/calendar/types/appointment.types";
import { MouseEvent, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { sectionOdontogramConstants } from "@features/shared/calendar/constants/odontogram.constants";
import AddSectionTreatmentsSheet from "../../../sheets/AddSectionTreatmentsSheet";

export type SelectedSectionType = {
  id: string,
}

const SectionServiceStep = () => {

  const setViewActiveSheets = useViewAppointmentStore((state) => state.setViewActiveSheets)
  const [ selectedSection, setSelectedSection] = useState<SelectedSectionType | null>(null)
  const { control, watch } = useFormContext();

  const sectionCheckups = watch("checkupData.sectionCheckup") as SectionCheckupType[];

  const { append: appendSectionCheckup } = useFieldArray({
    control,
    name: "checkupData.sectionCheckup",
  });

  const handleSectionClick = (section: SelectedSectionType, event: MouseEvent) => {
    setSelectedSection(section);
    event.preventDefault();
    const alreadyExists = sectionCheckups.some((checkup) => checkup.sectionName === section.id) 
    && sectionCheckups.some((checkup) => checkup.sectionTreatmentPlans.length > 0);
    if (!alreadyExists) {
      appendSectionCheckup({
        sectionName: section.id,
        sectionTreatmentPlans: [],
      });
    }
    setViewActiveSheets((prev) => [
      ...prev,
      {
        name: "ExtraSheet2",
        component: <AddSectionTreatmentsSheet 
          selectedSection={section}
          setSelectedSection={setSelectedSection}
        />,
      },
    ]);
  };

  
  return (
    <section className="flex items-center justify-between h-full flex-col w-full gap-6">
      <div className="w-[90%] h-[24rem] flex items-center justify-center relative transition-colors duration-500 ease-in-out">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 315" fill="none" className="w-full h-full">
          {sectionOdontogramConstants.map((section, index) => {
            const hasTreatment = sectionCheckups.some((checkup) => checkup.sectionName === section.id);
            const isSeleted = selectedSection ? selectedSection.id === section.id : false

            return (
              <g key={index}>
                <path
                  key={`${index}-center`}
                  d={section.center}
                  strokeLinecap="round"
                  onClick={(event) => handleSectionClick(section, event)}
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
                  onClick={(event) => handleSectionClick(section, event)}
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
    </section>
  )
}

export default SectionServiceStep