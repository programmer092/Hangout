import { useEffect, useState } from "react";
import axios from "axios";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { baseURL } from "../assets/utils/baseURL";

const useGetMessage = () => {
  const [loading, setloading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessage = async () => {
      if (!selectedConversation || !selectedConversation._id) {
        return;
      }
      try {
        setloading(true);
        const response = await axios.get(
          `${baseURL}/chat/getMessage/${selectedConversation._id}`,
          {
            withCredentials: true,
          }
        );
        if (response) {
          setMessages(response.data);
        }
      } catch (error: unknown) {
        toast.error(error as string);
      } finally {
        setloading(false);
      }
    };

    if (selectedConversation?._id) {
      getMessage();
    }
  }, [selectedConversation, setMessages]);

  return { loading, messages };
};
export default useGetMessage;
