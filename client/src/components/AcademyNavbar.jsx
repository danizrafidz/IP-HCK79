import { Link } from "react-router";
import HTGLogo from "./HTGLogo";
import { IoLogOut } from "react-icons/io5";

export default function AcademyNavbar() {
  function handleLogout() {
    try {
      localStorage.removeItem("access_token");
    } catch (err) {
      console.log(err, "<<< err handleLogout");
    }
  }

  return (
    <div className="flex flex-col">
      <div className="navbar bg-[#35455e] shadow-sm px-16">
        <div className="navbar-start">
          <HTGLogo styles="text-[#a3b0cc] scale-125" />
        </div>
        <div className="navbar-end">
          <Link
            className="flex items-center px-4 py-2  btn btn-[#111926] text-[#fc3d3d] transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-primary dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            to="/"
            onClick={handleLogout}
          >
            <IoLogOut className="size-5" />
            <span className="mx-4 font-medium">Logout</span>
          </Link>
        </div>
      </div>
      <div className="bg-[#273954] h-20"></div>
    </div>
  );
}
