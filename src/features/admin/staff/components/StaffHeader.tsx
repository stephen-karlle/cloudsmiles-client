import { getStaffCount } from '../services/staff.services'
import { useStaffStore } from '../stores/staff.store'
import { useQuery } from '@tanstack/react-query'
import LinkButton from '@components/shared/LinkButton'
import UsersIcon from '@icons/linear/UsersIcon'
import TableHeaderSkeleton from '@components/shared/skeletons/TableHeaderSkeleton'
import Button from '@components/ui/Button'
import FilterLinesIcon from '@icons/linear/FilterLinesIcon'
import PlusIcon from '@icons/linear/PlusIcon'
import AddNewAssistantForm from './forms/AddNewAssistantForm'
import AddNewDentistForm from './forms/AddNewDentistForm'

const StaffHeader = () => {

  const activeOutlet = useStaffStore((state) => state.activeOutlet)
  const setActiveOutlet = useStaffStore((state) => state.setActiveOutlet)
  const setStaffDrawerOpen = useStaffStore((state) => state.setStaffDrawerOpen)
  const setMainSheet = useStaffStore((state) => state.setMainSheet)

  const handleOpenAddAssistantDrawer = () => {
    setStaffDrawerOpen(true)
    setMainSheet({ 
      name: "MainSheet1", 
      component: <AddNewAssistantForm /> 
    })
  }
  
  const handleOpenAddDentistDrawer = () => {
    setStaffDrawerOpen(true)
    setMainSheet({ 
      name: "MainSheet1", 
      component: <AddNewDentistForm/> 
    })
  }

  const { data: staffCount, isLoading } = useQuery(
    {
      queryKey: ['staffHeaderData'],
      queryFn: getStaffCount,
    },
  );


  return (
    isLoading ? (
      <TableHeaderSkeleton />
    ) : (
      <section
        className="h-fit w-full flex flex-col bg-white "
      >            
        <header className="h-24 w-full flex items-center justify-start gap-4 p-6 ">
          <section className="flex items-start justify-start h-full">
            <figure className="w-10 h-10 rounded-full bg-lime-50 flex p-1 items-center justify-center">
              <UsersIcon className="w-6 h-6 stroke-2 stroke-lime-500" />
            </figure>
          </section>
          <section className="flex items-center justify-start h-full">
            <section className="flex flex-col items-start gap-1 h-full">
              <label className="text-xs font-medium tracking-wide text-gray-500 uppercase">
                TOTAL {activeOutlet === "Dentist" ? " Dentists" : " Assistants"}
              </label>
              <h1 className="text-3xl font-medium tracking-tight text-gray-900">
                {activeOutlet === "Dentist" ? staffCount.dentistCount : staffCount.assistantCount}
              </h1>
            </section>
          </section>
        </header>
        <header className="w-8 flex gap-8 items-center justify-start h-auto px-6 ">
        <LinkButton 
            onClick={()=>setActiveOutlet("Dentist")}
            isActive={activeOutlet === "Dentist"} 
          >
            Dentist
          </LinkButton>
          <LinkButton 
            onClick={()=>setActiveOutlet("Assistant")}
            isActive={activeOutlet === "Assistant"} 
          >
            Assistant
          </LinkButton>
        </header>
        <header className="flex items-center justify-between h-20 px-6 border-t border-gray-200">
          <Button variant="secondary" className="gap-2">
            <FilterLinesIcon className="w-5 h-5 stroke-2 stroke-gray-700" />
            Filters
          </Button>
          <Button 
            variant="primary"
            onClick={activeOutlet === "Dentist" ? handleOpenAddDentistDrawer: handleOpenAddAssistantDrawer}
          >
            <PlusIcon className="stroke-2 stroke-white" />
            {activeOutlet === "Dentist" ? "Add New Dentist" : "Add New Assistant"}
          </Button>
        </header>
      </section>
    )
  )
}

export default StaffHeader