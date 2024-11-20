import { useStaffStore } from '@features/admin/staff/stores/staff.store'
import AdminLayout from '@layouts/AdminLayout'
import DentistOulet from '@features/admin/staff/components/outlets/DentistOutlet'
import AssistantOutlet from '@features/admin/staff/components/outlets/AssistantOutlet'
import Drawer from '@components/ui/Drawer'

const AdminStaffPage = () => {
  
  const isStaffDrawerOpen = useStaffStore((state) => state.isStaffDrawerOpen)
  const mainSheet = useStaffStore((state) => state.mainSheet)
  const activeSheets = useStaffStore((state) => state.activeSheets)
  const activeOutlet = useStaffStore((state) => state.activeOutlet)

  return (
    <AdminLayout>
      <Drawer 
        mainSheet={mainSheet}
        isOpen={isStaffDrawerOpen}
        activeSheets={activeSheets}
      />
      {activeOutlet === "Dentist" && <DentistOulet />}
      {activeOutlet === "Assistant" && <AssistantOutlet />}
    </AdminLayout>
  )
}

export default AdminStaffPage


