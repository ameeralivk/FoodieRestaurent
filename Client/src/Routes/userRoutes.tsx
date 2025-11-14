import { Route, Routes } from "react-router-dom";
import UserLandingPage from "../Pages/user/auth/LandingPage";
import UserLogin from "../Pages/user/auth/userLogin";
const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLandingPage />} />
      <Route path="/login" element={<UserLogin />} />
    </Routes>
  );
};

export default UserRoutes;
