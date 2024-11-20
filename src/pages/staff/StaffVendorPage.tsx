
import { useDrawerStore } from '@stores/drawer.store'
import Drawer from '@components/ui/Drawer'
import VendorOutlet from '@features/shared/vendors/components/outlets/VendorOutlet'
import AdminLayout from '@layouts/AdminLayout'
import AssistantLayout from '@layouts/AssistantLayout'

type StaffVendorPageProps = {
  role: string;
}

const StaffVendorPage = ({ role }: StaffVendorPageProps) => {
  let Layout;
  switch (role) {
    case "admin":
      Layout = AdminLayout;
      break;
    case "assistant":
      Layout = AssistantLayout;
      break;
    default:
      Layout = AdminLayout; 
  }

  const isDrawerOpen = useDrawerStore((state) => state.isDrawerOpen)
  const activeSheets =  useDrawerStore((state) => state.activeSheets)
  const mainSheet = useDrawerStore((state) => state.mainSheet)

  return (
    <Layout>
      <Drawer 
        mainSheet={mainSheet}
        isOpen={isDrawerOpen}
        activeSheets={activeSheets} 
      />
      <VendorOutlet />
    </Layout>  
  )
}

export default StaffVendorPage
