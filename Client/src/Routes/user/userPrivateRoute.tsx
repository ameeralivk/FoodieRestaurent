import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function UserPrivateRoute({ children }: any) {
  const user = useSelector((state: any) => state.userAuth.user);

  return user ? children : <Navigate to="/user/login" replace />;
}


