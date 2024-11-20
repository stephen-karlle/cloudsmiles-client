import { updateChainData } from '../../services/chatbot.services';
import { useUserStore } from '@stores/user.store';
import Button from '@components/ui/Button';

interface ITimeMessage {
  handleSendMessage: ( prompt: string) => void;
}

const PreviousDentistMessage = ({ handleSendMessage }: ITimeMessage) => {


  const user = useUserStore((state) => state.user)
  const patientId = user._id

  const handleSubmit = async (decision: boolean) =>{

     await updateChainData({
      previousDentist:  decision === true ? "Yes" : "No",
      patientId: patientId,
    })

    const yesPrompt = `Ye, I want to continue with my previous dentist.`
    const noPrompt = `No, I want to choose a new dentist.`
    const prompt = decision ? yesPrompt : noPrompt
    handleSendMessage(prompt)
  }



  return (
    <article className="border-t border-gray-200 px-2 py-2 mt-4 flex  gap-4">
      <Button 
        className="w-52 mt-4"
        onClick={() => handleSubmit(false)}
        variant="secondary"
      >
        No
      </Button>    
      <Button 
        className="w-full mt-4"
        onClick={() => handleSubmit(true)}
        variant="primary"
      >
        Yes
      </Button>    
    </article>
  )
}

export default PreviousDentistMessage