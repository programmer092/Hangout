import Avatar from "react-avatar";
import useConversation from "../../zustand/useConversation";
import MesssageDisplay from "./MessageDisplay";
import MessageInput from "./MessageInput";
import { useEffect } from "react";
import HeaderForLargeScreen from "./HeaderLarger";
import HeaderForSmallScreen from "./HeaderSmall";
import { baseURL } from "../../assets/utils/baseURL";

export default function Messsage() {
  const { selectedConversation, setSelectedConversation } = useConversation();

  //for cleanup so that new session do not continue from previous section
  useEffect(() => {
    return () => {
      setSelectedConversation(null);
    };
  }, [setSelectedConversation]);

  return (
    <>
      {selectedConversation === null || !selectedConversation ? (
        <div className="flex-1 flex items-center justify-center bg-green-200">
          <p className=" text-black text-3xl">Start Conversation</p>
        </div>
      ) : (
        <>
          {/* Message Header for Small Screens */}
          <HeaderForSmallScreen selectedConversation={selectedConversation} />
          {/* Message Display Section  */}
          <div className="hidden sm:flex flex-1 overflow-auto  flex-col bg-green-200 relative rounded-md">
            {/* Message Header for Medium and Large Screens  */}
            <HeaderForLargeScreen selectedConversation={selectedConversation} />
            {/* Message Body  */}
            <div className="flex-1 overflow-auto p-2 bg-white rounded-lg shadow-md">
              <MesssageDisplay />
            </div>
            {/* Message Footer (Fixed )  */}
            <MessageInput />
          </div>

          <div className="md:hidden flex-1 overflow-auto bg-white rounded-lg  shadow-md mb-16">
            <MesssageDisplay />
          </div>
          <div className="md:hidden mt-2">
            <MessageInput />
          </div>
        </>
      )}

      {/*  modal */}
      <dialog id="modal2" className="modal modal-middle sm:modal-middle">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <div className="hero min-h-24">
            <div className="hero-content flex-col lg:flex-row">
              <Avatar
                name={selectedConversation?.name}
                src={
                  selectedConversation?.profileImg
                    ? `${baseURL}${selectedConversation.profileImg}`
                    : undefined
                }
                size="90"
              />
              <div>
                <p>{selectedConversation?.name}</p>
                <p>{selectedConversation?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
