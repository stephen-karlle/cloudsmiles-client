
import AdminNavbar from "@components/admin/AdminNavbar"
import AdminSidebar from "@components/admin/AdminSidebar";
import { ReactNode} from "react"

interface IAdminLayout {
  children: ReactNode
}

const AdminLayout = ({ children }: IAdminLayout ) => {

  return (
    <main className="w-screen h-screen flex ">
      <article className="h-full flex-shrink-0">
        <AdminSidebar />
      </article>
      <article className="w-full h-full flex flex-col  overflow-hidden ">
        <AdminNavbar />
        <section className="w-full h-full flex flex-col overflow-hidden">
          {children}
        </section>
      </article>
    </main>

  )
}

export default AdminLayout
