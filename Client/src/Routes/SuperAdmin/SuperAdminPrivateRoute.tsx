import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type{ RootState } from "../../redux/store/store";

const SuperAdminRoute: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const admin = useSelector((state: RootState) => state.auth.admin);

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  if (admin?.role !== "superadmin") {
    return <Navigate to="/admin/no-access" replace />;
  }

  return <Outlet />;
};

export default SuperAdminRoute;
