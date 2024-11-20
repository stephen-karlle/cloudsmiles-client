import { useStocksStore } from '@features/shared/stocks/stores/stocks.store'
import { useDrawerStore } from '@stores/drawer.store'
import InventoryOutlet from '@features/shared/stocks/components/outlets/InventoryOutlet'
import OrderOutlet from '@features/shared/stocks/components/outlets/OrderOutlet'
import Drawer from '@components/ui/Drawer'
import AdminLayout from '@layouts/AdminLayout'
import AssistantLayout from '@layouts/AssistantLayout'


type StaffStocksPageProps = {
  role: string;
}

const StaffStocksPage = ({ role }: StaffStocksPageProps ) => {
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

  const activeOutlet = useStocksStore((state) => state.activeOutlet)
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
      { activeOutlet === "Inventory" && <InventoryOutlet />}
      { activeOutlet === "Order" && <OrderOutlet />}
    </Layout>
  )
}

export default StaffStocksPage


