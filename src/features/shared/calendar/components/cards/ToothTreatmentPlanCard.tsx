import { Fragment } from 'react';
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { toothConditionsConstants } from '../../constants/conditions.constants';
import SelectionBox, { IOption } from '@components/ui/SelectionBox';
import CloseIcon from "@icons/linear/CloseIcon";
import RadioButton from "@components/ui/RadioButton";
import ComboBox from '@components/ui/ComboBox';
import ErrorMessage from '@components/ui/ErrorMessage';
import Label from '@components/ui/Label';

type ToothPlanCardType = {
  index: number;
  checkupIndex: number;
  treatmentConstants: IOption[];
  filteredTreatmentConstants: IOption[];
};

const ToothTreatmentPlanCard = ({ index, checkupIndex, treatmentConstants, filteredTreatmentConstants }: ToothPlanCardType) => {

  const { control,  clearErrors, formState: { errors },} = useFormContext();
  const { remove, } = useFieldArray({
    control, 
    name: `checkupData.toothCheckup.${checkupIndex}.toothTreatmentPlans`, 
  });  


  const handleRemoveTreatment = () => {
    remove(index);
  };


  const error = ((errors?.checkupData as any)?.toothCheckup?.[checkupIndex]?.toothTreatmentPlans?.[index]) || null;


  return (
    <article className="flex flex-col w-full ring-1 ring-gray-200 rounded-md">
      <section className="h-12 border-b border-gray-200 rounded-t-md bg-gray-50 px-4 flex items-center justify-between">
        <h1 className="text-lg font-medium tracking-tight text-gray-700">Tooth Treatment #{index + 1}</h1>      
        <button className="flex items-center justify-center w-8 h-8" type="button" onClick={handleRemoveTreatment}>
          <CloseIcon className="w-6 h-6 stroke-2 stroke-rose-500" />
        </button>
      </section>
      <Controller
        name={`checkupData.toothCheckup.${checkupIndex}.toothTreatmentPlans.${index}`}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Fragment>
            <section className="flex w-full items-start justify-between gap-4 px-6 pt-4">
              <div className="flex flex-col w-full gap-2">
                <Label >Condition</Label>
                <ComboBox
                  options={toothConditionsConstants}
                  placeholder="condition"
                  value={value.toothCondition}
                  setValue={(item) => {
                    onChange({
                      ...value, 
                      toothCondition: item,
                    });
                    clearErrors(`checkupData.toothCheckup.${checkupIndex}.toothTreatmentPlans.${index}.toothCondition`);
                  }}
                  className="z-20"
                  didError={!!error?.toothCondition}
                />
                <ErrorMessage message={error?.toothCondition?.message} />
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label >Treatment</Label>
                <SelectionBox
                  options={filteredTreatmentConstants}
                  placeholder="treatment"
                  value={treatmentConstants.find((treatment) => treatment.id === value?.toothTreatmentId)?.name || null}
                  setValue={(item) => {
                    onChange({
                      ...value, 
                      toothTreatmentId: item.id,
                    });
                    clearErrors(`checkupData.toothCheckup.${checkupIndex}.toothTreatmentPlans.${index}.toothTreatmentId`);
                  }}
                  className="z-20"
                  didError={!!error?.toothTreatmentId}
                />
                <ErrorMessage message={error?.toothTreatmentId?.message} />
              </div>
            </section>
            <section className="flex flex-col items-start justify-start gap-2 px-6 pb-4 pt-2">
              <Label >Status</Label>
              <div className="flex items-center justify-start gap-4 w-full">
                <RadioButton 
                  className="h-10 w-full" 
                  value="Recommended"
                  checked={value?.toothStatus === "Recommended"}
                  setChecked={() => {
                    onChange({
                      ...value, 
                      toothStatus: "Recommended", 
                    });
                    clearErrors(`checkupData.toothCheckup.${checkupIndex}.toothTreatmentPlans.${index}.toothStatus`);
                  }}
                  didError={!!error?.toothStatus}              
                />
                <RadioButton 
                  className="h-10 w-full" 
                  value="Approved"
                  checked={value?.toothStatus === "Approved"}
                  setChecked={() => {
                    onChange({
                      ...value, 
                      toothStatus: "Approved", 
                    });
                    clearErrors(`checkupData.toothCheckup.${checkupIndex}.toothTreatmentPlans.${index}.toothStatus`);
                  }}
                  didError={!!error?.toothStatus}     
                />
              </div>
              <ErrorMessage message={error?.toothStatus?.message} />
            </section>
          </Fragment>
        )}
      />   
    </article>
  );
};

export default ToothTreatmentPlanCard;