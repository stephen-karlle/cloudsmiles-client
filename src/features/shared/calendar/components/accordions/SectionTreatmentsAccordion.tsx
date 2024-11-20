import { useState } from 'react'
import { Accordion, AccordionContent, AccordionHeader } from '@components/ui/Accordion';
import PhilippinePesoIcon from '@icons/linear/PhilippinePesoIcon';
import { TreatmentCostsResponseType } from '@features/admin/treatments/types/treatment.types';

type SectionTreatmentsAccordionProps = {
  treatmentCost: TreatmentCostsResponseType | undefined | null
}

const SectionTreatmentsAccordion = ({treatmentCost }: SectionTreatmentsAccordionProps) => {
  const [ collapseSection, setCollapseSection ] = useState<boolean>(false)
  const sectionTreatments = treatmentCost?.section ? treatmentCost.section : []
  const sectionTreatmentTotalCost = sectionTreatments.map((treatment) => treatment.treatmentCost * (treatment?.sections?.length ? treatment?.sections?.length : 1)).reduce((acc, cost) => acc + cost, 0)


  return (
    <Accordion 
      className="w-full" 
      collapse={collapseSection} 
      setCollapse={setCollapseSection}
      isDisabled={sectionTreatments.length === 0}
    >
      <AccordionHeader className="w-full grid grid-cols-[auto_30%] px-4 py-2">
        <label className="flex items-center justify-start font-medium text-gray-700">
          {`Section ${sectionTreatments.length > 1 ? 's' : ''}${sectionTreatments.length > 0 ? ` (${sectionTreatments.length})` : ''}`}                
        </label>
        <div className="flex items-center justify-end ">
          <PhilippinePesoIcon className="stroke-2 stroke-gray-700 w-5 h-5" />
          <label className="text-md text-gray-700">{sectionTreatmentTotalCost.toLocaleString("en-US")}</label>
        </div>
      </AccordionHeader>
      <AccordionContent className="w-full px-4 mb-2">
        {sectionTreatments.length > 0 && sectionTreatments.map((treatment, index) => (    
          <div 
            className=" w-full grid grid-cols-[auto_30%] "
            key={index}
          >
            <div className="flex flex-col">
              <label className="text-md text-gray-700">{treatment.treatmentName + " (" + treatment.sections?.length + ")"}</label>
              <label className="text-sm text-gray-500 ">
                {treatment.sections && treatment.sections.length > 0 && (
                  <span className="">
                    {treatment.sections.map(section => section).join(',  ')}
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

export default SectionTreatmentsAccordion