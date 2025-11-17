import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function UserPublicRoute() {
  const token = useSelector((state: any) => state.userAuth.token);

  if (token) {
    return <Navigate to="/user" replace />;
  }

  return <Outlet />;
}
