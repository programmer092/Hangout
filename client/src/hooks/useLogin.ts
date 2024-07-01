import axios from "axios";
import toast from "react-hot-toast";
import { UseAuthContext } from "../context/authUser";
import { useState } from "react";

export interface AxiosError {
  response?: {
    data: string;
  };
}

function useLogin() {
  const [loading, setloading] = useState(false);
  const { setauthUser } = UseAuthContext();
  const login = async (email: string, password: string) => {
    const empty = isEmpty(email, password);
    if (empty) {
      throw new Error("Please fill in all fields");
    }
    try {
      setloading(true);

      const result = await axios.post(
        "http://localhost:3000/chat/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      if (result && result.data) {
        const userData = JSON.stringify(result.data);
        localStorage.setItem("user", userData);
        setauthUser(result.data);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.data) {
        toast.error(axiosError.response.data);
        throw new Error(axiosError.response.data);
      } else {
        toast.error("An error occurred. Please try again later.");
        console.error(error);
        throw error;
      }
    } finally {
      setloading(false);
    }
  };

  return { loading, login };
}

function isEmpty(email: string, password: string) {
  if (!email || !password) {
    toast.error("Please fill in all fields!");
    return true;
  }
  return false;
}

export default useLogin;
