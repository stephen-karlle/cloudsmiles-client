import { useQuery } from '@tanstack/react-query';
import { getTreatmentCount } from '../services/treatment.services';
import { useDrawerStore } from '@stores/drawer.store';
import TreatmentIcon from '@icons/linear/TreatmentIcon'
import LinkButton from '@components/shared/LinkButton';
import TableHeaderSkeleton from '@components/shared/skeletons/TableHeaderSkeleton';
import Button from '@components/ui/Button';
import PlusIcon from '@icons/linear/PlusIcon';
import FilterLinesIcon from '@icons/linear/FilterLinesIcon';

const TreatmentHeader = () => {

  const { data: treatmentCount, isLoading} = useQuery(
    {
      queryKey: ['treatmentHeaderData', 'treatmentTableData'],
      queryFn: getTreatmentCount,
    },
  );

  const setAddDrawerOpen = useDrawerStore((state) => state.setDrawerOpen)


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
            <TreatmentIcon className="w-6 h-6 stroke-2 stroke-lime-500" />
            </figure>
          </section>          
          <section className="flex items-center justify-start h-full">
            <section className="flex flex-col items-start h-full">
              <label className="text-xs font-medium tracking-wide text-gray-500">TOTAL TREATMENTS</label>
              <h1 className="text-3xl font-medium tracking-tight text-gray-900">{treatmentCount}</h1>
            </section>
          </section>
        </header>
        <header className="w-8 flex gap-8 items-center justify-start h-auto px-6 ">
          <LinkButton 
            onClick={() => {}}
            isActive={true} 
            >
            Treatments
          </LinkButton>
        </header>
        <header className="flex items-center justify-between h-20 px-6 border-t border-gray-200">
          <Button variant="secondary" className="gap-2">
            <FilterLinesIcon className="w-5 h-5 stroke-2 stroke-gray-700" />
            Filters
          </Button>
          <Button 
            variant="primary"
            onClick={()=>setAddDrawerOpen(true)}
          >
            <PlusIcon className="stroke-2 stroke-white" />
            New Treatment
          </Button>
        </header>
      </section>
    )
  )
}

export default TreatmentHeader

