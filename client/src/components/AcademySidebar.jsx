import { Link, useNavigate } from "react-router";
import { IoLogOut } from "react-icons/io5";
import { useEffect, useState } from "react";
import api from "../helpers/axiosInstance";
import Toast from "../helpers/toast";

export default function AcademySidebar() {
  const [user, setUser] = useState({});
  const [files, setFiles] = useState(null);
  const access_token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  const handleUploadGalleries = async (e) => {
    try {
      e.preventDefault();

      console.log("uploading...");

      // formData.append("galleries", file);

      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("galleries", file);
      });

      const response = await api.patch(`/user/cover-galleries`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${access_token}`,
        },
      });

      await fetchUser();
      console.log("uploaded.");
      Toast.fire({
        title: "Success",
        icon: "success",
        text: "Success upload image",
      });
    } catch (err) {
      console.log(err, "<<< err handleOnUpload");
      Toast.fire({
        title: "Error",
        icon: "error",
        text: err.response.data.message,
      });
    }
  };

  async function fetchUser() {
    try {
      const { data } = await api({
        method: "GET",
        url: "/user",
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      });

      setUser(data);
    } catch (err) {
      console.log(err, "<<< err fetchUser");
    }
  }
  useEffect(() => {
    fetchUser();
  }, []);

  let teamColor = {
    Red: "bg-[#422834] text-[#ff3d3d]",
    Blue: "bg-[#153557] text-[#0088ff]",
    Purple: "bg-[#321d57] text-[#c466ff]",
  };

  return (
    <aside className="flex flex-col w-64 rounded h-screen px-4 py-8 ml-8 overflow-y-auto bg-[#111926] rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
      <div className="flex flex-col items-center mt-6 -mx-2">
        <img
          className="object-cover w-24 h-24 mx-2 rounded-full border-3 border-primary border-dashed"
          src={user.avatarUrl}
          alt="avatar"
        />
        <h4 className="mx-2 mt-2 font-medium text-[#a3b0cc] dark:text-gray-200">
          {user.fullName}
        </h4>
        <p className="mx-2 mt-1 text-sm font-medium text-[#a3b0cc] dark:text-gray-400">
          {user.email}
        </p>
        <p
          className={`badge mx-2 mt-1 text-sm font-medium ${
            teamColor[user.Team?.name]
          } dark:text-gray-400`}
        >
          {user.Team?.name} Team
        </p>
      </div>
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
          <Link
            className="flex items-center px-4 py-2 mt-5 text-[#a3b0cc] transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-primary dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            to="/modules"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="mx-4 font-medium">Modules</span>
          </Link>

          <Link
            className="flex items-center px-4 py-2 mt-5 text-[#a3b0cc] transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-primary dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            to="/modules/unlocked"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V10C4.10457 10 5 10.8954 5 12C5 13.1046 4.10457 14 3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10V7C21 5.89543 20.1046 5 19 5H5Z"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="mx-4 font-medium">Unlocked Modules</span>
          </Link>

          <Link
            className="flex items-center px-4 py-2 mt-5 text-[#a3b0cc] transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-primary dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            to="/user-settings"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="mx-4 font-medium">Profiles</span>
          </Link>

          
        </nav>

        <div>
          <div className="divider divider-[#a3b0cc] text-[#a3b0cc] font-medium text-xs">
            Cyber Galleries
          </div>
          <div className="carousel carousel-vertical rounded-box h-60">
            {user.galleries?.map((gallery, i) => (
              <div
                key={i + 1}
                className="carousel-item h-full border-2 border-primary"
              >
                <Link to={gallery} target="_blank" rel="noopener noreferrer">
                  <img src={gallery} />
                </Link>
              </div>
            ))}
          </div>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
            }}
            onSubmit={handleUploadGalleries}
          >
            <input
              type="file"
              multiple
              onChange={(e) => setFiles([...e.target.files])}
              className="file-input file-input-bordered w-full max-w-xs mt-8"
            />
            <div className="flex w-half justify-between">
              <input
                className="btn bg-brand-orange text-white font-extrabold"
                type="submit"
                value="Upload"
              />
            </div>
          </form>
        </div>
      </div>
    </aside>
  );
}
