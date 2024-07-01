import LSideBar from "../components/LSidebar";
import RSideBar from "../components/RSidebar";
import Messsage from "../components/Message/Message";

export default function ChatPage() {
  return (
    <>
      <div className="flex flex-col h-screen md:flex-row sm:bg-green-200">
        <LSideBar />
        <Messsage />
        <RSideBar />
      </div>
    </>
  );
}
