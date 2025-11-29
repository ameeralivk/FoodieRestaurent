import { Route, Routes } from "react-router-dom";
import RestaurentLoginPage from "../Pages/auth/RestaurentLoginPage";
import AdminRegisterPage from "../Pages/auth/RestaurantRegisterPage";
import PageNotFound from "../Pages/auth/PageNotFound";
import ForgetPasswordPage from "../Pages/auth/ForgotPassword";
import RestaurantMainRegistration from "../Pages/auth/RestuarantRegisterMainPage";
import ProtectedRoute from "./protectedRoute";
import PublicRoute from "./publicRoute";
import ResetPasswordPage from "../Pages/auth/forgetPasswordResetPage";
import SubscriptionPlans from "../Pages/admin/SubscriptionPage";
const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute><RestaurentLoginPage /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><AdminRegisterPage /></PublicRoute>} />
      <Route path="/forgetPassword" element={<PublicRoute><ForgetPasswordPage/></PublicRoute>}/>
      <Route path="/onboarding" element={<ProtectedRoute><RestaurantMainRegistration/></ProtectedRoute>} />
      {/* <Route path="/otp" element={<OTPVerificationModal modalOpen={true} email=""/>}/> */}
      <Route path="/reset-password" element={<ResetPasswordPage/>}/>
      <Route path="/*" element={<PageNotFound />} />
      <Route path="/subscription" element={<ProtectedRoute><SubscriptionPlans/></ProtectedRoute>}/>
    </Routes>
  );
};

export default AdminRoutes;
