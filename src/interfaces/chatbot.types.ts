
export interface IChatbot { 
  setIsOpen: (isOpen: boolean) => void;
}

export interface IChatbotMessage { 
  isMessageChained?: boolean;
  _id?: string;
  messageText: string;
  messageRole: string;
  messageComponent?: string;
  messageData?: any;
  messageDidError? : boolean;
  messageChainData?: any;
  createdAt: string;
}

export interface ISuggestions {
  handleSendMessage: (prompt: string) => void;
}

export interface IAnimatedText {
  message: string;
  isGenerating: boolean;
  setIsGenerating: (value: boolean) => void;
}

export interface IChatbox {
  lastMessage?: IChatbotMessage;
  message: string;
  setMessage: (message: string) => void;
  isGenerating: boolean;
  handleSendMessage: (prompt: string) => void;
}

export interface IHeader {
  setIsOpen: (isOpen: boolean) => void;
}

export interface IMessages { 
  messages: IChatbotMessage[];
  isGenerating: boolean;
  setIsGenerating: (value: boolean) => void;
  handleSendMessage: (prompt: string) => void;
}

export type IChatbotStore = { 
  isDrawerOpen: boolean;
  setDrawerOpen: (isOpen: boolean) => void;

  publicMessages: IChatbotMessage[];
  setPublicMessages: (messages: IChatbotMessage[]) => void;
  addPublicMessage: (message: IChatbotMessage) => void;
  updatePublicMessage: (message: IChatbotMessage) => void;
  filterPublicMessages: (filter: string) => void;

}