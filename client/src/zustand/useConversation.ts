import { create } from "zustand";
export interface IConversation {
  selectedConversation: Conversation | null; 
  setSelectedConversation: (
    selectedConversation: Conversation | null 
  ) => void;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
}

export interface Conversation {
  _id: string;
  profileImg?: string;
  createdAt: string;
  name: string;
  email: string;
}

export interface Message {
  _id: string;
  message: string;
  file: string;
  sender: string;
  conversationId: string;
  createdAt: string;
}
const useConversation = create<IConversation>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;
