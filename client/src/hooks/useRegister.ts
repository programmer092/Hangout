import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { UseAuthContext } from "../context/authUser";
import { useState } from "react";
interface User {
  name: string;
  email: string;
  password: string;
}

function useRegister() {
  const [loading, setloading] = useState<boolean>(false);
  const { setauthUser } = UseAuthContext();
  const Register = async (user: User) => {
    try {
      setloading(true);
      const result = await axios({
        method: "post",
        url: "http://localhost:3000/chat/register",
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
        },
        withCredentials: true,
      });
      if (result) {
        const userData = JSON.stringify(result.data);
        localStorage.setItem("user", userData);
        setauthUser(result.data);
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response && axiosError.response.data) {
        toast.error(axiosError.response.data.message);
        throw new Error(axiosError.response.data.message);
      } else {
        toast.error("An unknown error occurred");
        throw new Error("An unknown error occurred");
      }
    } finally {
      setloading(true);
    }
  };

  return { loading, Register };
}

export default useRegister;
