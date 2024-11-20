import { ReactNode } from "react"
import { useChatbotStore } from "@stores/chatbot/chatbot.store"
import Drawer from '@components/ui/Drawer'
import AssistantButton from "@features/guest/hero/components/AssistantButton"
import Navbar from "@components/guest/auth/Navbar"
import PublicChatbot from "@features/shared/chatbot/public/components/PublicChatbot"

interface ILandingLayout {
  children: ReactNode
}

const LandingLayout = ({ children }: ILandingLayout ) => {

  const isDrawperOpen = useChatbotStore((state) => state.isDrawerOpen)
  const setDrawerOpen = useChatbotStore((state) => state.setDrawerOpen)

  return (
    <main className="w-full h-full">
      <Drawer 
        mainSheet={
          { 
            name: "MainSheet",
            component: <PublicChatbot />,
          }
        }
        isOpen={isDrawperOpen}
        activeSheets={[]}
      />
      <AssistantButton setIsOpen={setDrawerOpen} />
      <Navbar />
      <article className="w-full h-full flex items-start justify-center">
        {children}
      </article>
    </main>
  )
}

export default LandingLayout
