import { usePatientStore } from '../stores/patient.store';
import { useQuery} from '@tanstack/react-query';
import { getPatientCount } from '../services/patient.services';
import LinkButton from '@components/shared/LinkButton';
import TableHeaderSkeleton from '@components/shared/skeletons/TableHeaderSkeleton';
import UserIcon from '@icons/linear/UserIcon';
import PlusIcon from '@icons/linear/PlusIcon';
import Button from '@components/ui/Button';
import FilterLinesIcon from '@icons/linear/FilterLinesIcon';
import AddNewPatientForm from './forms/AddNewPatientForm';

const PatientHeader = () => {
  const setPatientDrawerOpen = usePatientStore((state) => state.setPatientDrawerOpen)
  const setMainSheet = usePatientStore((state) => state.setMainSheet)
  const { data: patientCount, isLoading } = useQuery({
    queryKey: ['patientHeaderData'],
    queryFn: getPatientCount,
  });

  const handleOpenAddNewPatientDrawer = () => {
    setPatientDrawerOpen(true)
    setMainSheet({ name: "MainSheet", component: <AddNewPatientForm />})
  }

  return (    
    isLoading ? (
      <TableHeaderSkeleton />
    ) : (
      <section
        className="h-fit w-full flex flex-col bg-white  flex-shrink-0"
      >
        <header className="h-24 w-full flex items-center justify-start gap-4 p-6 ">
          <section className="flex items-start justify-start h-full">
            <figure className="w-10 h-10 rounded-full bg-lime-50 flex p-1 items-center justify-center">
              <UserIcon className="w-6 h-6 stroke-2 stroke-lime-500" />
            </figure>
          </section>
          <section className="flex items-center justify-start h-full">
            <section className="flex flex-col items-start gap-1 h-full">
              <label className="text-xs font-medium tracking-wide text-gray-500 uppercase">
                TOTAL PATIENTS
              </label>
              <h1 className="text-3xl font-medium tracking-tight text-gray-900">
                {patientCount}
              </h1>
            </section>
          </section>
        </header>
        <header className="w-8 flex gap-8 items-center justify-start h-auto px-6 ">
          <LinkButton 
            onClick={() => {}} 
            isActive={true}
          >
            Patients
          </LinkButton>
        </header>
        <header className="flex items-center justify-between h-20 px-6 border-t border-gray-200">
          <Button variant="secondary" className="gap-2">
            <FilterLinesIcon className="w-5 h-5 stroke-2 stroke-gray-700" />
            Filters
          </Button>
          <Button 
            variant="primary"
            onClick={handleOpenAddNewPatientDrawer}
          >
            <PlusIcon className="stroke-2 stroke-white" />
            Add New Patient
          </Button>
        </header>
      </section>
    )
  );
};

export default PatientHeader;
