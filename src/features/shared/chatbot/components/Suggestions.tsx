
import { suggestions } from "@constants/chatbot.constants"
import { ISuggestions } from '@interfaces/chatbot.types'
import { motion } from "framer-motion"

const Suggestions: React.FC<ISuggestions> = ({handleSendMessage}) => {

  return (
    <section className="w-full flex flex-col items-center justify-center gap-4">
      {suggestions.map((suggestion, index) => (
        <motion.button 
          className="w-full ring-1 ring-gray-200 rounded-md px-4 py-2" 
          key={index} 
          onClick={()=>handleSendMessage(suggestion.prompt)}
          initial={{ y: '5vw', opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          exit={{ y: '5vw', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300,  damping: 30, delay: 0.25 * (index + 1)}}
        >
          <h1 className="text-start text-base font-medium text-gray-700">{suggestion.title}</h1>
          <p className="text-start text-base text-gray-500">{suggestion.prompt}</p>
        </motion.button>
      ))}
    </section>
  )
}

export default Suggestions