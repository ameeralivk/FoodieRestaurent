
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store/store";
import React, { useEffect} from "react";
import { checkAuth } from "../config/AuthSync";
interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const admin = useSelector((state: RootState) => state.auth.admin);
  useEffect(() => {
    const fetch = async () => {
      const res = await checkAuth();
      console.log(res,'re')
    };
    fetch();
  }, []);
  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }
  if (admin?.role === "superadmin") {
    return <Navigate to="/superadmin" replace />;
  }

  return children;
};

export default ProtectedRoute;
