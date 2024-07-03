import { useState } from "react";
import { UseAuthContext } from "../context/authUser";
import useLogout from "../hooks/useLogout";
import Avatar from "react-avatar";
import toast from "react-hot-toast";
import useProfileUpload from "../hooks/useProfileUpload";

export default function RSideBar() {
  const [file, setFile] = useState<File | null>(null);
  const { logout } = useLogout();
  const { authUser } = UseAuthContext();
  const { profileUpload } = useProfileUpload();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();
    await logout();
  };

  const handleUpload: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();
    if (!file) {
      return toast.error("Select Image First");
    } else {
      profileUpload(file);
      const modal = document.getElementById("my_modal");
      if (modal) {
        (modal as HTMLDialogElement).close();
      }
    }
  };

  return (
    <>
      <div className="hidden md:block p-4 bg-green-200 md:w-1/4 rounded-md">
        <div className="min-h-full flex flex-col justify-between items-center">
          <div className="flex items-center justify-center mt-2">
            <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
              <Avatar
                src={
                  authUser && authUser.profileImg
                    ? `${authUser.profileImg}`
                    : undefined
                }
                name={authUser?.name || ""}
                round
                size="100%"
                onClick={() => {
                  const modal = document.getElementById("my_modal");
                  if (modal) {
                    (modal as HTMLDialogElement).showModal();
                  }
                }}
              />
            </div>
          </div>
          <div className="flex flex-col items-center space-y-4 mb-8">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-40"
              onClick={handleClick}
            >
              Logout
            </button>

            {/* Modal to uploaod the image */}
            <dialog id="my_modal" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <input
                  type="file"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                      setFile(files[0]);
                    }
                  }}
                />
                <button className="btn btn-outline" onClick={handleUpload}>
                  Upload
                </button>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </>
  );
}
