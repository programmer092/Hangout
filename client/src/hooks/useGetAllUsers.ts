import { useState, useEffect } from "react";
import axios from "axios";

const useGetAllUsers = () => {
  const [allusers, setallusers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/chat/alluser", {
          withCredentials: true,
        });
        if (!response) {
          throw new Error("Couldn't get the data!");
        }
        setallusers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllUsers();
  }, []);

  return { allusers };
};

export default useGetAllUsers;
