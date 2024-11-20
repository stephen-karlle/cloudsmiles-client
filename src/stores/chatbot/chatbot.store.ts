import { IChatbotStore } from '@interfaces/chatbot.types';
import { create } from 'zustand';

const savedMessages = sessionStorage.getItem("chatbotMessages");

export const useChatbotStore = create<IChatbotStore>()((set) => ({
  isDrawerOpen: false,
  setDrawerOpen: (isDrawerOpen) => set({ isDrawerOpen: isDrawerOpen }),

  publicMessages: savedMessages ? JSON.parse(savedMessages) : [],
  setPublicMessages: (messages) => set({ publicMessages: messages }),
  addPublicMessage: (message) => set((state) => ({ publicMessages: [message, ...state.publicMessages] })),
  updatePublicMessage: (message) => set((state) => ({ publicMessages: state.publicMessages.map((msg) => msg._id === message._id ? message : msg) })),
  filterPublicMessages: () => set((state) => ({ publicMessages: state.publicMessages.filter(message => message.messageRole !== "TEMP")})),
}));