// src/Components/PublicRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store/store";

interface PublicRouteProps {
  children: React.ReactElement;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const adminToken = useSelector((state: RootState) => state.auth.token);

  if (adminToken) {
    return <Navigate to="/admin/onboarding" replace />;
  }

  return children;
};

export default PublicRoute;
