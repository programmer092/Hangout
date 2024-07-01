import useConversation from "../zustand/useConversation";
import useGetAllUsers from "./useGetAllUsers";
import toast from "react-hot-toast";

interface User {
  name: string;
}

const useSearch = () => {
  const { setSelectedConversation } = useConversation();
  const { allusers } = useGetAllUsers();
  const Search = (input: string) => {
    const result = allusers.find((data: User) =>
      data.name.toLowerCase().includes(input.toLowerCase())
    );
    if (!result) {
      return toast.error("No user found!");
    } else {
      setSelectedConversation(result);
    }
  };

  return { Search };
};

export default useSearch;
