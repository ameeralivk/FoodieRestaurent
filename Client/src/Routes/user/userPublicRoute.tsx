import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function UserPublicRoute() {
  const user = useSelector((state: any) => state.userAuth.user);

  if (user) {
    return <Navigate to="/user" replace />;
  }

  return <Outlet />;
}
