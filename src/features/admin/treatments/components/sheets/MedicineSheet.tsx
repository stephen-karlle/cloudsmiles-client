import { useDrawerStore } from "@stores/drawer.store";
import { getAvailableMedicines } from "@features/admin/treatments/services/treatment.services";
import { TreatmentMedicineType, MedicineListType } from "@features/admin/treatments/types/treatment.types";
import { useQuery } from "@tanstack/react-query";
import { useFieldArray, useFormContext } from "react-hook-form";
import Button from "@components/ui/Button";
import PlusIcon from "@icons/linear/PlusIcon";
import TreatmentMedicineCard from "../cards/TreatmentMedicineCard";
import DrawerFooter from "@components/shared/DrawerFooter";
import DrawerHeader from "@components/shared/DrawerHeader";

const MedicineSheet = () => {

  const setActiveSheets = useDrawerStore((state) => state.setActiveSheets)

  const { 
    control,
    getValues, 
    trigger,
  } = useFormContext()

  
  const treatmentMedicines = getValues('treatmentMedicines') as TreatmentMedicineType[]

  const { append, remove } = useFieldArray({
    control, 
    name: "treatmentMedicines", 
  });  


  const handleAddMoreMedicines = () => {
    append({
      medicineProductId: "",
      medicineName: "",
      medicineAmount: "",
      medicineFreeAmount: "",
      isMedicineFree: "",
      // 
      prescriptionDosageType: "",
      prescriptionDosageAmount: "",
      prescriptionTimeDuration: "",
      prescriptionRepeatition: "",
      prescriptionTimeUnit: "",
      prescriptionTimeOfTheDay: [],
      prescriptionIntakeSchedule: [],
    })
  };

  const handleClose = async () => {
    // This basically checks if the component is valid or not but it will remove the medicines that are not valid
    // It will not remove all the medicines if there is a single invalid component
    const treatmentMedicines = getValues('treatmentMedicines') as TreatmentMedicineType[];
    const invalidIndexes: number[] = [];
  
    for (let i = 0; i < treatmentMedicines.length; i++) {
      const isValid = await trigger(`treatmentMedicines.${i}`);
      if (!isValid) {
        invalidIndexes.push(i);
      }
    }
  
    for (let i = invalidIndexes.length - 1; i >= 0; i--) {
      remove(invalidIndexes[i]);
    }
  
    setActiveSheets((prev) => 
      prev.filter(sheet => sheet.name !== "ExtraSheet1")
    );
  }

  const handleSubmit = async () => {
    const isValid = await trigger(["treatmentMedicines"]);
    if (isValid) {
      setActiveSheets((prev) => 
        prev.filter(sheet => sheet.name !== "ExtraSheet1")
      );
      return;
    }
  }
  

  const { data: medicineOptionList , isLoading  } = useQuery<MedicineListType[] | []>(
    {
      queryKey: ['availableMedicinesList'],
      queryFn: getAvailableMedicines,
    }
  );

  if (isLoading) return <div>Loading...</div>

  return (
    <article className="flex flex-col w-full h-full">
      <DrawerHeader 
        title="Add New Medicines"
        handleClose={handleClose}
        isLoading={false}
      />
      <section 
        className="overflow-y-auto px-6 py-4 h-full overflow-x-hidden outline-none"
        style={{ scrollbarGutter: 'stable' }}
      >
        <div className="flex items-center justify-between w-full mt-2">
          <label className="text-lg font-medium text-gray-700 tracking-tight ">Medicines used</label>
          <Button 
            variant="secondary"
            className="flex items-center justify-center  text-sm h-8 text-lime-500"
            onClick={handleAddMoreMedicines}
          >
            <PlusIcon className="w-5 h-5 stroke-2 stroke-lime-500" />
            Add New Medicine
          </Button>
        </div>
        <div className="flex flex-col my-8 gap-6">
          {treatmentMedicines.map((_, index) => (
            <TreatmentMedicineCard 
              key={index}
              medicinesOptionList={medicineOptionList || []} 
              index={index}
            />
          ))}
        </div>
      </section>
      <DrawerFooter 
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        isLoading={false}
        type="sheet"
      />
    </article>
  )
}

export default MedicineSheet