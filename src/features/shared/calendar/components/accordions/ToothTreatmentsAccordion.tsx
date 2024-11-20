import { Accordion, AccordionContent, AccordionHeader } from '@components/ui/Accordion';
import { useState } from 'react'
import PhilippinePesoIcon from '@icons/linear/PhilippinePesoIcon';
import { TreatmentCostsResponseType } from '@features/admin/treatments/types/treatment.types';

const toothConstants: { [key: number]: string } = {
  1: "Central Incisor",
  2: "Lateral Incisor",
  3: "Canine (Cuspid)",
  4: "First Premolar",
  5: "Second Premolar",
  6: "First Molar",
  7: "Second Molar",
  8: "Third Molar",
};

type ToothTreatmentsAccordionProps = {
  treatmentCost: TreatmentCostsResponseType | undefined | null
}

const ToothTreatmentsAccordion = ({ treatmentCost }: ToothTreatmentsAccordionProps) => {
  const [ collapseTooth, setCollapseTooth ] = useState<boolean>(false)
  const toothTreatments = treatmentCost?.tooth ? treatmentCost.tooth : []
  const toothTreatmentsTotalCost = toothTreatments.map((treatment) => treatment.treatmentCost * (treatment?.tooths?.length ? treatment?.tooths?.length : 1)).reduce((acc, cost) => acc + cost, 0)

  return (
    <Accordion 
      className="w-full" 
      collapse={collapseTooth} 
      setCollapse={setCollapseTooth}
      isDisabled={toothTreatments.length === 0}
    >
      <AccordionHeader className="w-full grid grid-cols-[auto_30%] px-4 py-2">
        <label className="flex items-center justify-start font-medium text-gray-700">
          {`Tooth${toothTreatments.length > 1 ? 's' : ''}${toothTreatments.length > 0 ? ` (${toothTreatments.length})` : ''}`}                
        </label>
        <div className="flex items-center justify-end ">
          <PhilippinePesoIcon className="stroke-2 stroke-gray-700 w-5 h-5" />
          <label className="text-md text-gray-700">{toothTreatmentsTotalCost.toLocaleString("en-US")}</label>
        </div>
      </AccordionHeader>
      <AccordionContent className="w-full px-4  mb-2">
        {toothTreatments.length > 0 && toothTreatments.map((treatment, index) => (    
          <div 
            className=" w-full grid grid-cols-[auto_30%] "
            key={index}
          >
            <div className="flex flex-col">
              <label className="text-md text-gray-700">{treatment.treatmentName + " (" + treatment.tooths?.length + ")"}</label>
              <label className="text-sm text-gray-500 ">
                {treatment.tooths && treatment.tooths.length > 0 && (
                  <span className="">
                    {treatment.tooths.map(tooth => {
                      const lastDigit = tooth % 10;
                      return `${toothConstants[lastDigit]} (${tooth})`;
                    }).join(',  ')}
                  </span>
                )}
              </label>

            </div>
            <div className="flex items-center justify-end ">
              <PhilippinePesoIcon className="stroke-2 stroke-gray-500 w-4 h-4" />
              <label className="text-md text-gray-500">{treatment.treatmentCost.toLocaleString("en-US")}</label>
            </div>
          </div>
        ))}
      </AccordionContent>
    </Accordion>
  
  )
}

export default ToothTreatmentsAccordion