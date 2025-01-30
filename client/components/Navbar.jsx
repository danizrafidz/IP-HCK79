import { Link } from "react-router";
import HTGLogo from "./HTGLogo";

export default function Navbar() {
  return (
    <div className="navbar bg-[#0b121f] shadow-sm">
      <div className="navbar-start">
        <HTGLogo />
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
  );
}
