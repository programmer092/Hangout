import Avatar from "react-avatar";
import useGetAllUsers from "../hooks/useGetAllUsers";
import useConversation from "../zustand/useConversation";
import { useState } from "react";
import useSearch from "../hooks/useSearch";
import { toast } from "react-hot-toast";
import { UseSocketContext } from "../context/Socket";

interface User {
  _id: string;
  name: string;
  profileImg: string;
  email: string;
  createdAt: string;
}

export default function LSideBar() {
  const [data, setData] = useState<string>("");
  const { allusers } = useGetAllUsers();
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { Search } = useSearch();
  const { onlineUsers } = UseSocketContext();

  const handleClick: React.MouseEventHandler<SVGSVGElement> = (e) => {
    e.preventDefault();

    if (!data) return;

    if (data.length < 3) {
      return toast.error("Must be greater than 3 characters");
    }

    Search(data);
    setData("");
  };

  return (
    <>
      <div className="flex flex-col md:w-1/5 rounded-md">
        {/* Search Input for larger screen */}
        <label className="hidden md:flex input input-bordered items-center justify-center w-full p-2 mt-2">
          <input
            type="text"
            className="grow p-1 m-2 rounded-md w-32"
            placeholder="Search"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-5 h-5 opacity-80"
            onClick={handleClick}
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>

        {/* Search input for smaller screen */}
        <label className="md:hidden input input-bordered flex items-center justify-center w-screen gap-2 pt-1 h-8 rounded-md">
          <input
            type="text"
            className="grow p-1 m-1 rounded-md w-full"
            placeholder="Search"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-5 h-5 opacity-80"
            onClick={handleClick}
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>

        {/* All Users Lists Displaying For smaller screen*/}
        <div className="md:hidden mt-1 mb-1 w-full">
          {/* User List for Small Screens  */}
          <div className="flex overflow-x-auto p-1 bg-red-300 rounded-md">
            {/* Example user avatars  */}
            {/* <ul> */}
            {allusers.map((user: User) => (
              // <li key={user._id}>
              <button
                key={user._id}
                onClick={() => {
                  setSelectedConversation({
                    _id: user._id,
                    name: user.name,
                    profileImg: user.profileImg,
                    email: user.email,
                    createdAt: user.createdAt,
                  });
                }}
                className={
                  selectedConversation?._id === user._id
                    ? " bg-gray-500 rounded-md text-black"
                    : "text-black"
                }
              >
                <div className="flex flex-col items-center relative pr-3">
                  <div className="relative">
                    <Avatar
                      src={
                        user?.profileImg
                          ? `http://localhost:3000${user.profileImg}`
                          : undefined
                      }
                      name={user.name}
                      round
                      style={{
                        height: "50px",
                        width: "50px",
                        border: "1px solid #000",
                      }}
                      size="100%"
                    />
                    {onlineUsers.includes(user._id) && (
                      <div className="absolute top-0 left-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <span className="text-center text-xs">
                    {user.name.split(" ")[0]}
                  </span>
                </div>
              </button>
            ))}
            {/* </li> */}
            {/* </ul> */}
          </div>
        </div>

        {/* User List for Medium and Large Screens  */}
        <div className="hidden md:flex flex-col w-full h-full md:overflow-y-auto p-2 bg-green-200 mt-2 rounded-md">
          {/* Example user avatars */}
          {/* <ul> */}
          {allusers.map((user: User) => (
            // <li key={user._id}>
            <button
              key={user._id}
              onClick={() => {
                setSelectedConversation({
                  _id: user._id,
                  name: user.name,
                  profileImg: user.profileImg,
                  email: user.email,
                  createdAt: user.createdAt,
                });
              }}
              className={
                selectedConversation?._id === user._id
                  ? " bg-gray-500 rounded-md text-black"
                  : "text-black"
              }
            >
              <div className="flex items-center pr-2 pb-2">
                <div className="relative">
                  <Avatar
                    src={
                      user?.profileImg
                        ? `http://localhost:3000${user.profileImg}`
                        : undefined
                    }
                    name={user.name}
                    round
                    style={{
                      height: "60px",
                      width: "60px",
                      border: "2px solid #000",
                    }}
                    size="100%"
                  />
                  {onlineUsers.includes(user._id) && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <span className=" text-lg ml-1">{user.name}</span>
              </div>
            </button>
            // </li>
          ))}
          {/* </ul> */}
        </div>
      </div>
    </>
  );
}
