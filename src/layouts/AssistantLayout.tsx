import { ReactNode } from "react"
import AssistantNavbar from "@components/assistant/AssistantNavbar"
import AssistantSidebar from "@components/assistant/AssistantSidebar"

interface AssistantLayoutProps {
  children: ReactNode
}

const AssistantLayout = ({ children }: AssistantLayoutProps ) => {

  return (
    <main className="w-screen h-screen flex ">
      <article className="h-full flex-shrink-0">
        <AssistantSidebar />
      </article>
      <article className="w-full h-full flex flex-col  overflow-hidden ">
        <AssistantNavbar />
        <section className="w-full h-full flex flex-col overflow-hidden">
          {children}
        </section>
      </article>
    </main>

  )
}

export default AssistantLayout
