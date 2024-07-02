import useConversation from "../zustand/useConversation";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { baseURL } from "../assets/utils/baseURL";

const useSendMessage = () => {
  const [loading, setloading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message: string, file?: File) => {
    setloading(true);
    if (!selectedConversation || !selectedConversation._id) {
      return;
    }
    try {
      const formData = new FormData();
      formData.append("message", message);
      if (file) {
        formData.append("file", file);
      }
      const response = await axios({
        method: "post",
        url: `${baseURL}/chat/sendMessage/${selectedConversation._id}`,
        data: formData,
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response) {
        setMessages([...messages, response.data]);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError.toString());
    } finally {
      setloading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;
