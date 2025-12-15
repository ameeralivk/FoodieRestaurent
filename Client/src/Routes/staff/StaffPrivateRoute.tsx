import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function StaffPrivateRoute({ children }: any) {
  const user = useSelector((state: any) => state.userAuth.user);

  return user && (user.role === "staff"||"chef") ? (
    children
  ) : (
    <Navigate to="/staff/login" replace />
  );
}