import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function StaffPublicRoute() {
  const user = useSelector((state: any) => state.userAuth.user);
  if (user && (user.role == "staff" || "chef")) {
    return <Navigate to="/staff/dashboard" replace />;
  }

  return <Outlet />;
}
