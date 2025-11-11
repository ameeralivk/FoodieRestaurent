// src/Components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type{ RootState } from "../redux/store/store";
import { useEffect } from "react";
import React, { Children } from "react";
interface ProtectedRouteProps {
  children:React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = useSelector((state: RootState) => state.auth.token);

  
  if (!token) {
   
    return <Navigate to="/admin/login" replace />;
  }

  return children
};

export default ProtectedRoute;
