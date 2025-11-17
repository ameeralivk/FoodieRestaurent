import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function UserPrivateRoute({ children }: any) {
  const token = useSelector((state: any) => state.userAuth.token);

  return token ? children : <Navigate to="/user/login" replace />;
}


