import { useState, useRef } from "react";
import useSendMessage from "../../hooks/useSendMessage";
import { FaPaperPlane, FaPaperclip } from "react-icons/fa";
import toast from "react-hot-toast";

export default function MessageInput() {
  const [msg, setmsg] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const { sendMessage } = useSendMessage();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    if (msg === "" && !selectedFile) {
      return toast.error("Can't send empty message!");
    }
    await sendMessage(msg, selectedFile);
    setmsg("");
    setSelectedFile(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        setSelectedFile(file);
      } else {
        toast.error("Only image files are allowed!");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    }
  };

  return (
    <>
      <div className="flex items-center p-2 bg-blue-100 rounded-lg shadow-md fixed bottom-0 left-0 w-full md:w-auto md:relative z-10">
        <div className="flex items-center max-w-4xl w-full mx-auto bg-white border-t border-gray-200 p-2 rounded-md">
          <button
            className="mr-2 bg-gray-100 text-gray-700 p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleFileClick}
          >
            <FaPaperclip />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <input
            type="text"
            placeholder="Type your message..."
            value={msg}
            onChange={(e) => setmsg(e.target.value)}
            className="flex-1 bg-gray-100 min-w-10 rounded-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleClick}
            className="ml-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </>
  );
}
