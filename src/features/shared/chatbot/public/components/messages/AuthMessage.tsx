import Button from '@components/ui/Button'
import { useChatbotStore } from '@stores/chatbot/chatbot.store'
import { useNavigate } from 'react-router-dom'

const AuthMessage = () => {

  const navigate = useNavigate()
  const setDrawerOpen = useChatbotStore((state) => state.setDrawerOpen)
  const handleNavigate = (path: string) => {

    setDrawerOpen(false)
    setTimeout(() => {
      navigate(path)
    }, 250)
  }

  return (
    <article className="border-t border-gray-200 p-4 pt-6 mt-4">
      <section className="flex items-center justify-between gap-4">
        <Button 
          className="w-1/2" 
          variant="secondary"
          onClick={() => handleNavigate("/login")}

        >
          Login
        </Button>
        <p>or</p>
        <Button 
          className="w-full " 
          variant="primary"
          onClick={() => handleNavigate("/signup")}
        >
          Sign up
        </Button>
      </section>
    </article>
  )
}

export default AuthMessage