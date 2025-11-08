import { Route, Routes } from "react-router-dom";
import RestaurentLoginPage from "../Pages/auth/RestaurentLoginPage";
import AdminRegisterPage from "../Pages/auth/RestaurantRegisterPage";
import PageNotFound from "../Pages/auth/PageNotFound";
import ForgetPasswordPage from "../Pages/auth/ForgotPassword";
import RestaurantMainRegistration from "../Pages/auth/RestuarantRegisterMainPage";
import OTPVerificationModal from "../Components/modals/AdminOtpModal";
const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<RestaurentLoginPage />} />
      <Route path="/register" element={<AdminRegisterPage />} />
      <Route path="/forgetPassword" element={<ForgetPasswordPage/>}/>
      <Route path="/onboarding" element={<RestaurantMainRegistration/>} />
      <Route path="/otp" element={<OTPVerificationModal modalOpen={true}/>}/>
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AdminRoutes;
