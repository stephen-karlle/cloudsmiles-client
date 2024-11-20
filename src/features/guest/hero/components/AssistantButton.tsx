import { FC } from 'react'
import Smiley from '@assets/smiley-white.svg'

interface IAssistantButton {
  setIsOpen: (open:boolean) => void;
}

const AssistantButton: FC <IAssistantButton> = ({ setIsOpen }) => {
  return (
    <button   
      className="shadow-md shadow-gray-200 hover:scale-110 transition-all duration-300 ease-in-out hover:bg-lime-400 active:bg-lime-600 bg-lime-500 absolute bottom-12 right-12 z-10 rounded-full p-4 flex items-center justify-center gap-2 w-16 h-16"
      onClick={()=>setIsOpen(true)}
    >
      <img src={Smiley} alt="Chatbot Icon" className="flex-shrink-0 z-10" />
    </button>
  )
}

export default AssistantButton
