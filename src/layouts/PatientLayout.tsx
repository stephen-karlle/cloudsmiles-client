import { ReactNode, useState} from "react"
import Drawer from "@components/ui/Drawer";
import PrivateChatbot from "@features/shared/chatbot/private/components/PrivateChatbot";
import AssistantButton from "@features/guest/hero/components/AssistantButton";
import PatientDesktopSidebar from "@components/patient/desktop/PatientDesktopSidebar";
import PatientDesktopNavbar from "@components/patient/desktop/PatientDesktopNavbar";

interface IAdminLayout {
  children: ReactNode
}

const PatientLayout = ({ children }: IAdminLayout ) => {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <main className="w-screen h-screen flex ">
      <Drawer 
        mainSheet={
          { 
            name: "MainSheet",
            component: <PrivateChatbot setIsOpen={setIsOpen} />,
          }
        }
        isOpen={isOpen}
        activeSheets={[]}
      />
      <AssistantButton setIsOpen={setIsOpen} />
      <article className="h-full flex-shrink-0">
        <PatientDesktopSidebar />
      </article>
      <article className="w-full h-full flex flex-col  overflow-hidden ">
        <PatientDesktopNavbar />
        <section className="w-full h-full flex flex-col overflow-hidden">
          {children}
        </section>
      </article>
    </main>

  )
}

export default PatientLayout
