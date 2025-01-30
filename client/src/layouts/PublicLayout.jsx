import { Navigate, Outlet } from "react-router";

export default function PublicLayout() {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    return <Navigate to="/modules" />;
  }

  return <Outlet />;
}
