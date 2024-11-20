
import { ReactNode } from "react"
import DentistDesktopNavbar from "@components/dentist/desktop/DentistDesktopNavbar";
import DentistDesktopSidebar from "@components/dentist/desktop/DentistDesktopSidebar";

interface IDentistLayout {
  children: ReactNode
}

const DentistLayout = ({ children }: IDentistLayout ) => {

  return (
    <main className="w-screen h-screen flex ">
      <article className="h-full flex-shrink-0">
        <DentistDesktopSidebar />
      </article>
      <article className="w-full h-full flex flex-col  overflow-hidden ">
        <DentistDesktopNavbar />
        <section className="w-full h-full flex flex-col overflow-hidden">
          {children}
        </section>
      </article>
    </main>

  )
}

export default DentistLayout
