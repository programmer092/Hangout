import useGetMessage from "../../hooks/useGetMessage";
import useSocketMessage from "../../hooks/useSocketMessage";
import { Message } from "../../zustand/useConversation";
import Skeleton from "../Skeleton";
import ConversationDisplay from "./Conversation";
import { useRef, useEffect } from "react";

export default function MesssageDisplay() {
  const { loading, messages } = useGetMessage();

  //listening to message event from socketio
  useSocketMessage();
  const messagesEndRef = useRef(null);

  //auto scrolling the message to bottom
  const scrollToBottom = () => {
    (messagesEndRef.current as HTMLElement | null)?.scrollIntoView({
      behavior: "smooth",
    });
  };
  useEffect(() => {
    setTimeout(scrollToBottom, 100);
  }, [messages]);

  return (
    <>
      {loading && <Skeleton />}

      {!loading && messages.length === 0 && (
        <div className="flex-1 flex items-center justify-center placeholder">
          <p>Send message to start conversation.</p>
        </div>
      )}

      {!loading &&
        messages.length > 0 &&
        messages.map((message: Message) => (
          <ConversationDisplay key={message?._id} message={message} />
        ))}
      <div ref={messagesEndRef} />
    </>
  );
}
