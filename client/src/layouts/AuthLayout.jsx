import { Navigate, Outlet } from "react-router";
import AcademyNavbar from "../components/AcademyNavbar";
import AcademySidebar from "../components/AcademySidebar";

export default function AuthLayout() {
  const access_token = localStorage.getItem("access_token");
  if (!access_token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AcademyNavbar />
      <div className="flex justify-between -mt-10">
        <AcademySidebar />
        <div className="flex flex-col w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
