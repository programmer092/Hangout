import { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../assets/utils/baseURL";
import toast from "react-hot-toast";

const useGetAllUsers = () => {
  const [allusers, setallusers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await axios.get(`${baseURL}/chat/alluser`, {
          withCredentials: true,
        });
        if (!response) {
          throw new Error("Couldn't get the data!");
        }
        setallusers(response.data);
      } catch (error) {
        toast.error("Couldn't get the data!");
      }
    };

    getAllUsers();
  }, []);

  return { allusers };
};

export default useGetAllUsers;
