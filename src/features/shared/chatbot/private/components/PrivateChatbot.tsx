import { useUserStore } from "@stores/user.store";
import { useState } from "react"
import { IChatbot, IChatbotMessage } from '@interfaces/chatbot.types'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { privateApiClient } from "@constants/api.constants";
import PrivateChatbotHeader from './PrivateChatbotHeader';
import PrivateConversation from './PrivateConversation';
import PrivateChatbox from "./PrivateChatbox";

// Components

const PrivateChatbot = ({ setIsOpen }: IChatbot) => {

  const queryClient = useQueryClient()
  const user = useUserStore((state) => state.user)
  const [ message, setMessage ] = useState<string>("")
  const [ messages, setMessages] = useState<IChatbotMessage[]>([]);
  const [ isGenerating, setIsGenerating ] = useState<boolean>(false)




  const { isLoading, } = useQuery({
    queryKey: ['agentMessagesData', user._id],
    queryFn: async () => {
      const res = await privateApiClient.get(`/agent/v1/get-agent-messages/${user._id}`)
      setMessages(res.data)
      return res.data
    },
  })


  
  const patientChat = async (message: string) => {
    try {
      const newData = {
        patientMessage: message,
        patientId: user._id
      };
      const res = await privateApiClient.post(`/agent/v1/patient-chat`, newData);
      return res.data
    } catch (error) {
      return error
    }
  }



  const handleSendMessage = async (message: string) => {
    
    setIsGenerating(true);
    setMessage("")
    // SAVE THE USER MESSAGE TO STATE
    setMessages(prev => [{
      messageText: message,
      messageRole: "USER",
      messageComponent: "",
      createdAt: new Date().toDateString(),
    }, ...prev]);

    try {
      // TEMP MESSAGE FOR THAT LOADING ANIMATION
      setMessages(prev => [{
        messageText: "",
        messageRole: "TEMP",
        messageComponent: "",
        createdAt: new Date().toDateString(),
      }, ...prev]);
  
      const response = await patientChat(message);

      if( response.messageText.statusCode === 429) {
        throw new Error("Too many requests. Please try again later.");
      }

      const botMessage: IChatbotMessage = {
        messageText: response.messageText,
        ...(response.messageComponent && { messageComponent: response.messageComponent }),
        messageRole: "CHATBOT",
        messageData: response.messageData,
        createdAt: new Date().toDateString(),
      };
      // REMOVE THE TEMP MESSAGE AND UPDATE IT WITH THE REAL DATA
      setMessages(prev => [
        botMessage,
        ...prev.filter(message => message.messageRole !== "TEMP"), 
      ]);
      queryClient.invalidateQueries({ queryKey: ["patientAppointmentsData"] })
      queryClient.resetQueries({ queryKey: ["dentistTimeAvailability"] })

    } catch (error) {
      const errorMessage: IChatbotMessage = {
        messageText: "An error occured while processing your request. Please check your internet connection.",
        messageComponent: "error",
        messageRole: "CHATBOT",
        createdAt: new Date().toDateString(),
        messageDidError: true,
      };
      setMessages(prev => [
        errorMessage,
        ...prev.filter(message => message.messageRole !== "TEMP"), 
      ]);
      setIsGenerating(false);
    } 
  };

  const lastMessage = messages[0] ?? null;

  if(isLoading) return <div>Loading...</div>
  
  return (
    <article className="w-full h-full flex flex-col">
      {/* Header Section */}
      <PrivateChatbotHeader setIsOpen={setIsOpen}/>
      {/* Message Section */}
      <PrivateConversation
        messages={messages} 
        isGenerating={isGenerating} 
        setIsGenerating={setIsGenerating}
        handleSendMessage={handleSendMessage} 
      />
      {/* Input Section */}
      <PrivateChatbox
        lastMessage={lastMessage}
        message={message}
        setMessage={setMessage}
        isGenerating={isGenerating}
        handleSendMessage={handleSendMessage}
      />
    </article>
  );
};

export default PrivateChatbot;