import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type{ RootState } from "../../redux/store/store";
const SuperAdminRoute: React.FC = () => {
  const admin = useSelector((state: RootState) => state.auth.admin);
  const authenticated = useSelector((state:RootState)=>state.auth.isAuthenticated)
  console.log(authenticated,'auth')
  if (!admin || authenticated === false) {
    return <Navigate to="/admin/login" replace />;
  }

  if (admin?.role !== "superadmin") {
    return <Navigate to="/admin/no-access" replace />;
  }

  return <Outlet />;
};

export default SuperAdminRoute;
