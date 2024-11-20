import { useState } from 'react'
import { Accordion, AccordionContent, AccordionHeader } from '@components/ui/Accordion';
import { TreatmentCostsResponseType } from '@features/admin/treatments/types/treatment.types';
import PhilippinePesoIcon from '@icons/linear/PhilippinePesoIcon';

type GeneralTreatmentsAccordionProps = {
  treatmentCost: TreatmentCostsResponseType | undefined | null
}

const GeneralTreatmentsAccordion = ({treatmentCost }:GeneralTreatmentsAccordionProps) => {
  const [ collapseGeneral, setCollapseGeneral ] = useState<boolean>(false)
  const generalTreatments = treatmentCost?.general ? treatmentCost.general : []
  const generalTreatmentTotalCost = treatmentCost?.general ? treatmentCost.general.map((general) => general.treatmentCost).reduce((acc, cost) => acc + cost, 0) : 0

  return (
      <Accordion 
        className="w-full" 
        collapse={collapseGeneral} 
        setCollapse={setCollapseGeneral}
        isDisabled={generalTreatments.length === 0}
      >
        <AccordionHeader className="w-full grid grid-cols-[auto_30%] px-4 py-2">
          <label className="flex items-center justify-start font-medium text-gray-700">
            {`General ${generalTreatments.length > 0 ? ` (${generalTreatments.length})` : ''}`}                
          </label>
          <div className="flex items-center justify-end ">
            <PhilippinePesoIcon className="stroke-2 stroke-gray-700 w-5 h-5" />
            <label className="text-md text-gray-700">{generalTreatmentTotalCost.toLocaleString("en-US")}</label>
          </div>
        </AccordionHeader>
        <AccordionContent className="w-full px-4 mb-2">
          {generalTreatments.length > 0 && generalTreatments.map((treatment, index) => (    
            <div 
              className=" w-full grid grid-cols-[auto_30%] "
              key={index}
            >
              <div className="flex flex-col">
                <label className="text-md text-gray-700">{treatment.treatmentName}</label>
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

export default GeneralTreatmentsAccordion