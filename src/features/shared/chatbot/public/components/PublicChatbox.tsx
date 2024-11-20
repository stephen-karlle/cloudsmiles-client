import { useState  } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { IChatbox } from '@interfaces/chatbot.types';
import StarsIcon from '@icons/linear/StarsIcon';
import ArrowIcon from '@icons/linear/ArrowIcon';



const PublicChatbox= ({  message, setMessage, isGenerating, handleSendMessage} : IChatbox) => {

  
  const [ isFocused, setIsFocused ] = useState<boolean>(false);


  return (
    <article className="h-auto px-4 pb-4 flex flex-col ">
      <section className={`flex items-center justify-center gap-4 transition-all duration-400 ease-out h-full`}>
        <div className={`w-full flex gap-4 ring-1 ring-gray-200 rounded-full items-center justify-center px-4 ${isFocused ? "ring-1 ring-lime-500 outline outline-offset-1 outline-3 outline-lime-100" : ""}`}>
          <StarsIcon className="w-6 h-6 stroke-1 stroke-lime-500 fill-lime-500" />
          <input 
            type="text"
            className="w-full text-base text-gray-700 placeholder:text-base outline-none h-12"
            placeholder="How can I assist you today?"
            value={message}
            onChange={(e)=> setMessage(e.target.value)}
            onBlur={()=>{setIsFocused(false)}}
            onFocus={()=>setIsFocused(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && message && !isGenerating) {
                e.preventDefault(); 
                handleSendMessage(message);
              }
            }}
          />
          <button 
            className={`w-8 h-8 flex-shrink-0 flex items-center mr-1 justify-center rounded-lg ${!message || isGenerating ? "cursor-not-allowed bg-gray-400" :"bg-lime-500  cursor-pointer"}`}
            disabled={!message || isGenerating }
            onClick={()=>handleSendMessage(message)}
          >
            {isGenerating ? (
              <ThreeDots
                width="20"
                color="white"
                ariaLabel="rotating-lines-loading"
              />
            ):(
              <ArrowIcon className="stroke-white w-5 h-5 stroke-2 rotate-180"/>
            )}
          </button>
        </div>
      </section>
      
      <p className="text-gray-500 text-sm w-[95%] text-center mt-1 py-2 ">Smiley is still 
        <span className="bg-lime-50 text-sm text-lime-500 tracking-wide px-1 mx-1">Experimental Stage</span >
        and response times may be slower than usual. We appreciate your patience and understanding.
      </p>
    </article>
  )
}

export default PublicChatbox
