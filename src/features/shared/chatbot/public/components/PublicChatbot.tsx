import { useEffect } from 'react';
import { useState } from "react"
import { IChatbotMessage } from '@interfaces/chatbot.types'

// Components
import PublicHeader from './PublicHeader';
import PublicConversation from './PublicConversation';
import PublicChatbox from './PublicChatbox';
import { privateApiClient } from '@constants/api.constants';

const PublicChatbot = ( ) => {


  const [ message, setMessage ] = useState<string>("")
  const [ messages, setMessages] = useState<IChatbotMessage[]>(() => {
    const savedMessages = sessionStorage.getItem("chatbotMessages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  
  console.log(messages)

  const [ isGenerating, setIsGenerating ] = useState<boolean>(false)


  useEffect(() => {
    sessionStorage.setItem("chatbotMessages", JSON.stringify(messages));
  }, [messages]);


  
  const fetchData = async (message: string) => {

    const chatLogs = messages.slice(-6).map(({ messageText, messageRole }) => ({ 
      text:messageText, 
      role: messageRole,
    }));

    try {
      const newData = {
        guestMessage: message,
        guestChatLogs: chatLogs,
      };
      const res = await privateApiClient.post(`/agent/v1/guest-chat`, newData);
      return res.data
    } catch (error) {
      throw error
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
      setMessages(prev => [{
        messageText: "",
        messageRole: "TEMP",
        messageComponent: "",
        createdAt: new Date().toDateString(),
      }, ...prev]);
  
      const response = await fetchData(message);

      console.log(response)

      if( response.messageText.statusCode === 429) {
        throw new Error("Too many requests. Please try again later.");
      }

      const botMessage: IChatbotMessage = {
        messageText: response.messageText,
        ...(response.messageComponent && { messageComponent: response.messageComponent }),
        messageRole: "CHATBOT",
        messageData: response.messageData,
        messageChainData: response.messageChainData,
        isMessageChained: response.isMessageChained,
        createdAt: new Date().toDateString(),
    
      };


      setMessages(prev => [
        botMessage,
        ...prev.filter(message => message.messageRole !== "TEMP"), 
      ]);

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

  return (
    <article className="w-full h-full flex flex-col">
      {/* Header Section */}
      <PublicHeader/>
      {/* Message Section */}
      <PublicConversation
        messages={messages} 
        isGenerating={isGenerating} 
        setIsGenerating={setIsGenerating}
        handleSendMessage={handleSendMessage}
      />
      {/* Input Section */}
      <PublicChatbox
        message={message}
        setMessage={setMessage}
        isGenerating={isGenerating}
        handleSendMessage={handleSendMessage}
      />
    </article>
  );
};

export default PublicChatbot;