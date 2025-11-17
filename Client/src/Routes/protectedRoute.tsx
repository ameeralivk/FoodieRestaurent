// src/Components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type{ RootState } from "../redux/store/store";
import React from "react";
interface ProtectedRouteProps {
  children:React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const admin = useSelector((state:RootState)=>state.auth.admin)
  
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  if (admin?.role === "superadmin") {
    return <Navigate to="/superadmin" replace />;
  }

  return children
};

export default ProtectedRoute;
