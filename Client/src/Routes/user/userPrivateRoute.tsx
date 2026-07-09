import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../../redux/store/store";

export default function UserPrivateRoute({ children }: { children?: React.ReactNode }) {
  const user = useSelector((state: RootState) => state.userAuth.user);

  if (!user || user.role !== "user") {
    return <Navigate to="/user/login" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}
