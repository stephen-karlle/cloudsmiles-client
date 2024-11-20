import { Fragment } from 'react';
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import SelectionBox, { IOption } from '@components/ui/SelectionBox';
import CloseIcon from "@icons/linear/CloseIcon";
import ErrorMessage from '@components/ui/ErrorMessage';
import TextArea from '@components/ui/TextArea';
import RadioButton from '@components/ui/RadioButton';
import Label from '@components/ui/Label';

type GeneralPlanCardType = {
  checkupIndex: number;
  treatmentConstants: IOption[];
};



const GeneralTreatmentPlanCard = ({ checkupIndex, treatmentConstants }: GeneralPlanCardType) => {

  const { control,  clearErrors, formState: { errors },} = useFormContext();
  const { remove } = useFieldArray({
    control, 
    name: `checkupData.generalCheckup`, 
  });  


  const handleRemoveTreatment = () => {
    remove(checkupIndex);
  };


  const error = (errors?.checkupData as any)?.generalCheckup?.[checkupIndex] || null;


  return (
    <article className="flex flex-col w-full ring-1 ring-gray-200 rounded-md">
      <section className="h-12 border-b border-gray-200 rounded-t-md bg-gray-50 px-4 flex items-center justify-between">
        <h1 className="text-lg font-medium tracking-tight text-gray-700">General Treatment #{checkupIndex + 1}</h1>      
        <button className="flex items-center justify-center w-8 h-8" type="button" onClick={handleRemoveTreatment}>
          <CloseIcon className="w-6 h-6 stroke-2 stroke-rose-500" />
        </button>
      </section>
      <Controller
        name={`checkupData.generalCheckup.${checkupIndex}`}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Fragment>
            <section className="flex w-full items-start justify-between gap-4 px-6 pt-4 ">
              <div className="flex flex-col w-full gap-2">
                <Label>Treatment</Label>
                <SelectionBox
                  options={treatmentConstants}
                  placeholder="treatment"
                  value={treatmentConstants.find((treatment) => treatment.id === value?.generalTreatmentId)?.name || null}
                  setValue={(item) => {
                    onChange({
                      ...value, 
                      generalTreatmentId: item.id,
                    });
                    clearErrors(`checkupData.generalCheckup.${checkupIndex}.generalTreatmentId`);
                  }}
                  className="z-20"
                  didError={!!error?.generalTreatmentId}
                />
                <ErrorMessage message={error?.generalTreatmentId?.message} />
              </div>
            </section>
            <section className="flex flex-col items-start justify-start gap-2 px-6 pt-2">
              <Label>Status</Label>
              <div className="flex items-center justify-start gap-4 w-full">
                <RadioButton 
                  className="h-10 w-full" 
                  value="Recommended"
                  checked={value?.generalStatus === "Recommended"}
                  setChecked={() => {
                    onChange({
                      ...value, 
                      generalStatus: "Recommended", 
                    });
                    clearErrors(`checkupData.generalCheckup.${checkupIndex}.generalStatus`);
                  }}
                  didError={!!error?.generalStatus}              
                />
                <RadioButton 
                  className="h-10 w-full" 
                  value="Approved"
                  checked={value?.generalStatus === "Approved"}
                  setChecked={() => {
                    onChange({
                      ...value, 
                      generalStatus: "Approved", 
                    });
                    clearErrors(`checkupData.generalCheckup.${checkupIndex}.generalStatus`);
                  }}
                  didError={!!error?.generalStatus}     
                />
              </div>
              <ErrorMessage message={error?.generalStatus?.message} />
            </section>
            <section className="flex flex-col w-full px-6 pb-6 pt-2">
              <div className="flex flex-col w-full gap-2">
                <Label>Notes
                  <span className="ml-1 text-gray-500">(Optional)</span>
                </Label>                
                <TextArea
                  placeholder="Type a note.."
                  value={value?.generalNotes}
                  onChange={(e) => {
                    onChange({
                      ...value,
                      generalNotes: e.target.value,
                    });
                  }}
                />
              </div>
            </section>
          </Fragment>
        )}
      />   
    </article>
  );
};

export default GeneralTreatmentPlanCard;