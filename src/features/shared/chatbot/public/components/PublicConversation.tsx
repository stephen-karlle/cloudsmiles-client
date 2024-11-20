import { IChatbotMessage } from '@interfaces/chatbot.types'
import SmileyWhite from '@assets/smiley-white.svg'
import AnimatedText from '@features/shared/chatbot/components/AnimatedText'
import Suggestions from '@features/shared/chatbot/components/Suggestions'
import AuthMessage from './messages/AuthMessage';


export interface IMessages { 
  messages: IChatbotMessage[];
  isGenerating: boolean;
  setIsGenerating: (value: boolean) => void;
  handleSendMessage: (prompt: string) => void;
}

const PublicConversation = ({ messages, isGenerating, setIsGenerating, handleSendMessage}: IMessages) => {




  return (
    <section className="p-4 h-full gap-6 flex flex-col-reverse items-center justify-start overflow-y-scroll overflow-x-hidden scroll-gutter scroll-smooth">
      {messages.length > 0 ? (
        messages.map((message, index)=> {
          
          return (
            <div className={`w-full flex items-center ${message.messageRole === "CHATBOT" || message.messageRole === "TEMP" ? "justify-start" : "justify-end"}`} key={index}>
              {message.messageRole === "CHATBOT" || message.messageRole === "TEMP" ? (
                <div className="w-full max-w-[83.33%] flex items-start justify-start gap-4 ">
                  <img src={SmileyWhite} alt="Smiley Logo" className="mt-1 ml-1 w-8 h-8 p-[6px] rounded-full flex-shrink-0 bg-green-950" />
                  { index === 0 && isGenerating ? (
                    !message.messageText ? (
                      <div className="flex flex-col w-full justify-center items-start py-2 px-4 gap-1">
                        <p className=" w-fit text-base text-gray-700 whitespace-pre-line [overflow-wrap:anywhere]">Gathering Information...</p>
                        <div className="relative flex items-center justify-center rounded-full h-1 w-full bg-gray-200 overflow-clip">
                          <div className="absolute w-[80%] h-full bg-gradient-to-r from-transparent via-lime-500 to-transparent rounded-full animate-linear-loading"></div>
                        </div>
                      </div>
                    ) : (
                      <AnimatedText message={message.messageText} isGenerating={isGenerating} setIsGenerating={setIsGenerating}/>
                    )
                  ) : (
                    message.messageDidError ? (
                      <p className="ring-1 ring-rose-500 bg-rose-50 py-2 px-4 rounded-tl-none rounded-3xl w-fit text-base text-rose-500 whitespace-pre-line [overflow-wrap:anywhere]">{message.messageText}</p>
                    ) : (
                      <div className="w-auto max-w-10/12 ring-1 ring-gray-200 py-2 px-4 rounded-3xl rounded-tl-none">
                        <p className="text-gray-700 text-base whitespace-pre-line">{message.messageText}</p>
                        { message.messageComponent === "signInMessage" && <AuthMessage />}
                        {/* {message.messageComponent === "date" && isLatest && <DateMessage handleSendMessage={handleSendMessage} /> */}
                        {/* {message.messageComponent === "time" && isLatest && <TimeMessage handleSendMessage={handleSendMessage}  /> */}

                        {/* { message.messageComponent === "dentists" && isLatest && <DentistMessage handleSendMessage={handleSendMessage} setDentist={setDentist} />} */}
                      </div>
                    )                
                  )}
                </div>
              ) : (
                <p className="w-auto max-w-[83.333%] bg-lime-500 text-white text-base py-2 px-4 rounded-3xl rounded-tr-none whitespace-pre-line [overflow-wrap:anywhere]">
                  {message.messageText}
                </p>
              )}
            </div>
          )
        }
      )
      ):(
        <section className="w-full flex flex-col items-center justify-center py-4 ">
          <div className="w-16 h-16 p-3 rounded-full flex-shrink-0 flex items-center justify-center bg-green-950">
            <img src={SmileyWhite} alt="Smiley Logo" />
          </div>
          <h1 className="text-xl font-semibold mt-4 mb-12 text-gray-700">How can I assist you today?</h1>
          <Suggestions handleSendMessage={handleSendMessage}/>
        </section>
      )}
    </section>
  )
}

export default PublicConversation

