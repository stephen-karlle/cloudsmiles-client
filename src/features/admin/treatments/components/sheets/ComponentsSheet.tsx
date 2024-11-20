import { ITreatmentComponent, ComponentListType } from "@features/admin/treatments/types/treatment.types";
import { useQuery } from "@tanstack/react-query";
import { getAvailableComponents } from "@features/admin/treatments/services/treatment.services";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useDrawerStore } from "@stores/drawer.store";
import Button from "@components/ui/Button";
import PlusIcon from "@icons/linear/PlusIcon";
import TreatmentComponentCard from "../cards/TreatmentComponentCard";
import DrawerFooter from "@components/shared/DrawerFooter";
import DrawerHeader from "@components/shared/DrawerHeader";

const ComponentsSheet = () => {

  const setActiveSheets = useDrawerStore((state) => state.setActiveSheets)


  const { 
    control,
    getValues, 
    trigger,
  } = useFormContext()

  const treatmentComponents = getValues('treatmentComponents') as ITreatmentComponent[]


  const { append, remove } = useFieldArray({
    control, 
    name: "treatmentComponents", 
  });  


  const handleAddMoreComponent = () => {
    append({
      productId: "",
      componentName: "",
      componentAmount: ""
    })
  };

  const handleClose = async () => {
    // This basically checks if the component is valid or not but it will remove the components that are not valid
    // It will not remove all the components if there is a single invalid component
    const treatmentComponents = getValues('treatmentComponents') as ITreatmentComponent[];
    const invalidIndexes: number[] = [];
  
    for (let i = 0; i < treatmentComponents.length; i++) {
      const isValid = await trigger(`treatmentComponents.${i}`);
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
    const isValid = await trigger(["treatmentComponents"]);
    if (isValid) {
      setActiveSheets((prev) => 
        prev.filter(sheet => sheet.name !== "ExtraSheet1")
      );
      return;
    }
  }
  

  const { data: componentsOptionList , isLoading: isComponentLoading } = useQuery<ComponentListType[] | []>(
    {
      queryKey: ['availableComponentsList'],
      queryFn: getAvailableComponents,
    }
  );


  if (isComponentLoading) return <div>Loading...</div>

  
  return (
    <article className="flex flex-col w-full h-full">
      <DrawerHeader 
        title="Add New Components"
        handleClose={handleClose}
        isLoading={false}
      />
      <section 
        className="overflow-y-auto px-6 py-4 h-full overflow-x-hidden outline-none"
        style={{ scrollbarGutter: 'stable' }}
      >
        <div className="flex items-center justify-between w-full mt-2">
          <label className="text-lg font-medium text-gray-700 tracking-tight ">Components used</label>
          <Button 
            variant="secondary"
            className="flex items-center justify-center  text-sm h-8 text-lime-500"
            onClick={handleAddMoreComponent}
          >
            <PlusIcon className="w-5 h-5 stroke-2 stroke-lime-500" />
            Add New Component
          </Button>
        </div>
        <div className="flex flex-col my-8 gap-6">
          {treatmentComponents.map(( _, index ) => (
            <TreatmentComponentCard 
              key={index}
              index={index}
              componentsOptionList={componentsOptionList || []}
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

export default ComponentsSheet