import { Link } from "react-router";
import HTGLogo from "./HTGLogo";

export default function AcademyNavbar() {
  return (
    <div className="flex flex-col">
      <div className="navbar bg-[#35455e] shadow-sm px-16">
        <div className="navbar-start">
          <HTGLogo styles="text-[#a3b0cc]" />
        </div>
        <div className="navbar-end">
          <Link to="/register" className="btn bg-base-200 text-[#0b121f]">
            Login
          </Link>
          <Link to="/register" className="btn btn-primary text-[#0b121f]">
            Get Started
          </Link>
        </div>
      </div>
      <div className="bg-[#273954] h-20"></div>
    </div>
  );
}
