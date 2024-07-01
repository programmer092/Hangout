import { HiMiniUser, HiPhone, HiVideoCamera } from "react-icons/hi2";
import { IoLogOutOutline } from "react-icons/io5";
import useLogout from "../../hooks/useLogout";
import { Conversation } from "../../zustand/useConversation";

interface HeaderForSmallScreenProps {
  selectedConversation: Conversation;
}

export default function HeaderForSmallScreen({
  selectedConversation,
}: HeaderForSmallScreenProps) {
  const { logout } = useLogout();

  const handleClick = async (
    event: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    event.preventDefault();
    await logout();
  };

  return (
    <>
      {/* Message Header for small screen */}
      <div className="md:hidden flex items-center p-3 bg-blue-100 rounded-lg shadow-md mb-1">
        <HiMiniUser
          size="20"
          color="blue"
          className=" items-center mr-2"
          onClick={() => {
            const modal = document.getElementById(
              "modal2"
            ) as HTMLDialogElement;
            if (modal) {
              modal.showModal();
            }
          }}
        />
        <div className="flex text-base">{selectedConversation.name}</div>
        <div className="flex ml-auto items-center">
          <HiPhone size={20} color="gray" className="mr-3" />
          <HiVideoCamera size={20} color="gray" />
          <IoLogOutOutline
            size={20}
            color="red"
            className="ml-2"
            onClick={handleClick}
          />
        </div>
      </div>
    </>
  );
}
