import axios from "axios";
import toast from "react-hot-toast";
import { UseAuthContext } from "../context/authUser";
import { baseURL } from "../assets/utils/baseURL";

const useProfileUpload = () => {
  const { setauthUser } = UseAuthContext();
  const profileUpload = async (file: string | Blob) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await axios.post(
        `${baseURL}/chat/uploadProfile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response) {
        const userData = JSON.stringify(response.data);
        localStorage.setItem("user", userData);
        setauthUser(response.data);
        toast.success("Profile image uploaded successfully");
      }
    } catch (error) {
      toast.error("Error uploading profile image");
    }
  };

  return { profileUpload };
};

export default useProfileUpload;
