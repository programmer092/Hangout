import toast from "react-hot-toast";
import axios from "axios";
import { UseAuthContext } from "../context/authUser";
import { baseURL } from "../assets/utils/baseURL";

interface AxiosError {
  response?: {
    data: string;
  };
}

export default function useLogout() {
  const { setauthUser } = UseAuthContext();
  const logout = async () => {
    try {
      const result = await axios.post(`${baseURL}/chat/logout`);
      if (result.status == 200) {
        localStorage.removeItem("user");
        setauthUser(null);
      }
    } catch (e) {
      const axiosError = e as AxiosError;
      toast.error(axiosError.response?.data ?? "An error occurred.");
    }
  };

  return { logout };
}
