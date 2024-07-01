import {
  HiMiniUser,
  HiPhone,
  HiVideoCamera,
  HiMiniEllipsisVertical,
} from "react-icons/hi2";
import { Conversation } from "../../zustand/useConversation";

interface HeaderForLargeScreenProps {
  selectedConversation: Conversation;
}

export default function HeaderForLargeScreen({
  selectedConversation,
}: HeaderForLargeScreenProps) {
  return (
    <>
      {/* Message Header for Medium and Large Screens  */}
      <div className="hidden md:flex flex-row p-4 bg-blue-100 rounded-lg shadow-md mb-3 mt-1 mr-1 ml-1">
        <HiMiniUser
          size={28}
          color="blue"
          className="flex-shrink-0 mr-2"
          onClick={() => {
            const modal = document.getElementById(
              "modal2"
            ) as HTMLDialogElement;
            if (modal) {
              modal.showModal();
            }
          }}
        />
        <div className="flex text-xl">{selectedConversation.name}</div>
        <div className="flex ml-auto">
          <HiPhone size={24} color="gray" className="mr-6" />
          <HiVideoCamera size={24} color="gray" />
          <HiMiniEllipsisVertical size={24} color="black" className="ml-5" />
        </div>
      </div>
    </>
  );
}
