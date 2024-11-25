import { useQuery } from "@tanstack/react-query";
import { getVendorCount } from "../services/vendor.services";
import { useDrawerStore } from "@stores/drawer.store"
import Button from "@components/ui/Button"
import PlusIcon from "@icons/linear/PlusIcon"
import LinkButton from "@components/shared/LinkButton";
import TableHeaderSkeleton from "@components/shared/skeletons/TableHeaderSkeleton";
import NewVendorForm from "./forms/NewVendorForm";
import BuildingIcon from "@icons/linear/BuildingIcon";
import SearchInput from "@components/shared/SearchInput";

type VendorHeaderProps = ({
  onChange: (value: string) => void
})

const VendorHeader = ({
  onChange
}: VendorHeaderProps) => {

  const setStaffDrawerOpen = useDrawerStore((state) => state.setDrawerOpen)
  const setMainSheet = useDrawerStore((state) => state.setMainSheet)


  const { data: vendorCount, isLoading } = useQuery(
    {
      queryKey: ['vendorHeaderData'],
      queryFn: getVendorCount,
    },
  );

  const handleOpenDrawer = () => {
    setStaffDrawerOpen(true)
    setMainSheet({ 
      name: "MainSheet1", 
      component: <NewVendorForm /> 
    })
  }

  return (
    isLoading  ? (
      <TableHeaderSkeleton />
    ) : (
      <section
        className="h-fit w-full flex flex-col bg-white"
      >            
        <header className="h-24 w-full flex items-center justify-start gap-4 p-6 ">
          <section className="flex items-start justify-start h-full">
            <figure className="w-10 h-10 rounded-full bg-lime-50 flex p-1 items-center justify-center">
              <BuildingIcon className="w-6 h-6 stroke-2 stroke-lime-500" />
            </figure>
          </section>
          <section className="flex items-center justify-start h-full">
            <section className="flex flex-col items-start h-full">
              <label className="text-xs font-medium tracking-wide text-gray-500">
                  TOTAL VENDORS
              </label>
              <h1 className="text-3xl font-medium tracking-tight text-gray-900">
                {vendorCount}
              </h1>
            </section>
          </section>
        </header>
        <header className="w-8 flex gap-8 items-center justify-start h-auto px-6 ">
          <LinkButton 
            onClick={() => {}}
            isActive={true} 
            >
            Vendors
          </LinkButton>
        </header>
        <header className="flex items-center justify-between h-20 px-6 border-t border-gray-200">
          <SearchInput 
            placeholder='Search vendors...' 
            onChange={onChange}
          />
          <Button 
            variant="primary"
            onClick={handleOpenDrawer}
          >
            <PlusIcon className="stroke-2 stroke-white" />
            Add New Vendor
          </Button>
        </header>
      </section>
    )
  )
}

export default VendorHeader
