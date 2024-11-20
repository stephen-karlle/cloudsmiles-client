import DashboardOutlet from "@features/admin/dashboard/components/outlets/DashboardOutlet"
import AdminLayout from "@layouts/AdminLayout"

const AdminDashboardPage = () => {
  return (
    <AdminLayout>
      <DashboardOutlet />
    </AdminLayout>
  )
}

export default AdminDashboardPage
