import { useEffect } from "react";
import { UseSocketContext } from "../context/Socket";
import useConversation from "../zustand/useConversation";

const useSocketMessage = () => {
  const { socket } = UseSocketContext();
  const { messages, setMessages } = useConversation();

  //listening the real time message and saving the messages
  useEffect(() => {
    const listen = () => {
      socket?.off("MsgFromSocket");
    };

    socket?.on("MsgFromSocket", (msg) => {
      setMessages([...messages, msg]);
    });

    return listen;
  }, [socket, messages, setMessages]);
};
export default useSocketMessage;
