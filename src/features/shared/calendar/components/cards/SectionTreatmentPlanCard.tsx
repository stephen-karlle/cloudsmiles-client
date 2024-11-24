import { Fragment } from 'react';
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { sectionConditionsConstants } from '../../constants/conditions.constants';
import SelectionBox, { IOption } from '@components/ui/SelectionBox';
import CloseIcon from "@icons/linear/CloseIcon";
import RadioButton from "@components/ui/RadioButton";
import ComboBox from '@components/ui/ComboBox';
import ErrorMessage from '@components/ui/ErrorMessage';
import Label from '@components/ui/Label';

type SectionTreatmentPlanCardType = {
  index: number;
  checkupIndex: number;
  filteredTreatmentConstants: IOption[];
  treatmentConstants: IOption[];
};

const SectionTreatmentPlanCard = ({ 
  index, 
  checkupIndex, 
  filteredTreatmentConstants,
  treatmentConstants,
}: SectionTreatmentPlanCardType) => {

  const { control,  clearErrors, formState: { errors },} = useFormContext();
  const { remove } = useFieldArray({
    control, 
    name: `checkupData.sectionCheckup.${checkupIndex}.sectionTreatmentPlans`, 
  });  


  const handleRemoveTreatment = () => {
    remove(index);
  };


  const error = ((errors?.checkupData as any)?.sectionCheckup?.[checkupIndex]?.sectionTreatmentPlans?.[index]) || null;


  return (
    <article className="flex flex-col w-full ring-1 ring-gray-200 rounded-md">
      <section className="h-12 border-b border-gray-200 rounded-t-md bg-gray-50 px-4 flex items-center justify-between">
        <h1 className="text-lg font-medium tracking-tight text-gray-700">Section Treatment #{index + 1}</h1>      
        <button className="flex items-center justify-center w-8 h-8" type="button" onClick={handleRemoveTreatment}>
          <CloseIcon className="w-6 h-6 stroke-2 stroke-rose-500" />
        </button>
      </section>
      <Controller
        name={`checkupData.sectionCheckup.${checkupIndex}.sectionTreatmentPlans.${index}`}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Fragment>
            <section className="flex w-full items-start justify-between gap-4 px-6 pt-4">
              <div className="flex flex-col w-full gap-2">
                <Label >Condition</Label>
                <ComboBox
                  options={sectionConditionsConstants}
                  placeholder="condition"
                  value={value.sectionCondition}
                  setValue={(item) => {
                    onChange({
                      ...value, 
                      sectionCondition: item,
                    });
                    clearErrors(`checkupData.sectionCheckup.${checkupIndex}.sectionTreatmentPlans.${index}.sectionCondition`);
                  }}
                  className="z-20"
                  didError={!!error?.sectionCondition}
                />
                <ErrorMessage message={error?.sectionCondition?.message} />
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label>Treatment</Label>
                <SelectionBox
                  options={filteredTreatmentConstants}
                  placeholder="treatment"
                  value={treatmentConstants.find((treatment) => treatment.id === value?.sectionTreatmentId)?.name || null}
                  setValue={(item) => {
                    onChange({
                      ...value, 
                      sectionTreatmentId: item.id,
                    });
                    clearErrors(`checkupData.sectionCheckup.${checkupIndex}.sectionTreatmentPlans.${index}.sectionTreatmentId`);
                  }}
                  className="z-20"
                  didError={!!error?.sectionTreatmentId}
                />
                <ErrorMessage message={error?.sectionTreatmentId?.message} />
              </div>
            </section>
            <section className="flex flex-col items-start justify-start gap-2 px-6 pb-4 pt-2">
              <Label >Status</Label>
              <div className="flex items-center justify-start gap-4 w-full">
                <RadioButton 
                  className="h-10 w-full" 
                  value="Recommended"
                  checked={value?.sectionStatus === "Recommended"}
                  setChecked={() => {
                    onChange({
                      ...value, 
                      sectionStatus: "Recommended", 
                    });
                    clearErrors(`checkupData.sectionCheckup.${checkupIndex}.sectionTreatmentPlans.${index}.sectionStatus`);
                  }}
                  didError={!!error?.sectionStatus}              
                />
                <RadioButton 
                  className="h-10 w-full" 
                  value="Approved"
                  checked={value?.sectionStatus === "Approved"}
                  setChecked={() => {
                    onChange({
                      ...value, 
                      sectionStatus: "Approved", 
                    });
                    clearErrors(`checkupData.sectionStatus.${checkupIndex}.sectionTreatmentPlans.${index}.sectionStatus`);
                  }}
                  didError={!!error?.sectionStatus}     
                />
              </div>
              <ErrorMessage message={error?.sectionStatus?.message} />
            </section>
          </Fragment>
        )}
      />   
    </article>
  );
};

export default SectionTreatmentPlanCard;