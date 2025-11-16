import { Route, Routes } from "react-router-dom";
import UserLandingPage from "../Pages/user/auth/LandingPage";
import UserLogin from "../Pages/user/auth/userLogin";
import UserSignUpPage from "../Pages/user/auth/registerPage";
const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLandingPage />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/register" element={<UserSignUpPage/>}/>
    </Routes>
  );
};

export default UserRoutes;
