// src/Components/PublicRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store/store";

interface PublicRouteProps {
  children: React.ReactElement;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const admin = useSelector((state: RootState) => state.auth.admin);

  if (admin && admin?.role != "superadmin") {
    return <Navigate to="/admin/onboarding" replace />;
  } else if (admin && admin?.role === "superadmin") {
    return <Navigate to="/superadmin" replace />;
  }

  return children;
};

export default PublicRoute;
