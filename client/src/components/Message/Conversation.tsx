import { UseAuthContext } from "../../context/authUser";
import { extractTime } from "../../assets/utils/time";
import Avatar from "react-avatar";
import useConversation, { Message } from "../../zustand/useConversation";
import { useState } from "react";

export default function ConversationDisplay({ message }: { message: Message }) {
  const { authUser } = UseAuthContext();
  const { selectedConversation } = useConversation();
  const time = extractTime(message.createdAt);
  const Iamsender = message.sender === authUser?._id;
  const chatClass = Iamsender ? "chat-end" : "chat-start";
  const chatbg = Iamsender ? "bg-blue-500" : "bg-slate-300";
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (image: string) => {
    setImagePreview(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setImagePreview(null);
  };

  return (
    <>
      <div className={`chat ${chatClass}`}>
        <div className="chat-image avatar">
          <div className="w-10 md:w-14 rounded-full">
            <Avatar
              src={
                Iamsender
                  ? authUser?.profileImg
                    ? `http://localhost:3000${authUser.profileImg}`
                    : undefined
                  : selectedConversation?.profileImg
                  ? `http://localhost:3000${selectedConversation.profileImg}`
                  : undefined
              }
              name={Iamsender ? authUser?.name : selectedConversation?.name}
              size="100%"
            />
          </div>
        </div>
        <div>
          {" "}
          {message.message !== null && message.file !== null && (
            <div className="flex flex-col">
              <div
                className="w-32 h-32 sm:w-52 sm:h-52"
                onClick={() =>
                  openModal(`http://localhost:3000${message.file}`)
                }
              >
                <Avatar
                  src={`http://localhost:3000${message.file}`}
                  size="100%"
                  round="10px"
                />
              </div>
              <div className="max-w-32 text-black sm:max-w-52">
                {message.message}
              </div>
            </div>
          )}
          {message.message !== null && message.file === null && (
            <div
              className={`chat-bubble min-h-9 min-w-9 text-xs md:text-base p-2 md:p-3 text-black ${chatbg}`}
            >
              {message.message}
            </div>
          )}
          {message.file !== null && message.message === null && (
            <div
              className="w-32 h-32 sm:w-52 sm:h-52"
              onClick={() => openModal(`http://localhost:3000${message.file}`)}
            >
              <Avatar
                src={`http://localhost:3000${message.file}`}
                size="100%"
                round="10px"
              />
            </div>
          )}
        </div>
        <div className="chat-footer text-xs md:text-sm opacity-50">{time}</div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="relative">
            <img
              src={imagePreview!}
              alt="Preview"
              className="w-full h-full"
              sizes="100%"
            />
            <button
              className="fixed top-2 right-2 text-white text-2xl"
              onClick={closeModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
}
