
import { useKnowledgeStore } from "@features/admin/knowledge/stores/knowledge.store"
import ContextOutlet from "@features/admin/knowledge/components/outlets/ContextOutlet"
import RequestOutlet from "@features/admin/knowledge/components/outlets/RequestOutlet"
import AdminLayout from "@layouts/AdminLayout"
import Drawer from "@components/ui/Drawer.tsx"


const AdminKnowledgePage = () => {


  const activeOutlet = useKnowledgeStore((state) => state.activeOutlet)
  const isKnowledgeDrawerOpen = useKnowledgeStore((state) => state.isKnowledgeDrawerOpen)
  const mainSheet = useKnowledgeStore((state) => state.mainSheet)
  const activeSheets = useKnowledgeStore((state) => state.activeSheets)


  return (
    <AdminLayout >
      <Drawer
        mainSheet={mainSheet}
        isOpen={isKnowledgeDrawerOpen}
        activeSheets={activeSheets}
      />
      {activeOutlet === "Context" && <ContextOutlet />}
      {activeOutlet === "Request" && <RequestOutlet />}
    </AdminLayout>
  )
}

export default AdminKnowledgePage
