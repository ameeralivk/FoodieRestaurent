import { Route, Routes } from "react-router-dom";
import RestaurentLoginPage from "../Pages/auth/RestaurentLoginPage";
import AdminRegisterPage from "../Pages/auth/RestaurantRegisterPage";
import PageNotFound from "../Pages/auth/PageNotFound";
import ForgetPasswordPage from "../Pages/auth/ForgotPassword";
import RestaurantMainRegistration from "../Pages/auth/RestuarantRegisterMainPage";
import ProtectedRoute from "./protectedRoute";
import PublicRoute from "./publicRoute";
import ResetPasswordPage from "../Pages/auth/forgetPasswordResetPage";
import AdminDashboard from "../Pages/admin/AdminDashboard";
import AdminSubscriptionPage from "../Pages/admin/AdminSubscriptionPage";
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
      <Route path="/dashboard" element={<ProtectedRoute><AdminDashboard/></ProtectedRoute>}/>
       <Route path="/subscriptionplan" element={<AdminSubscriptionPage/>}/>
    </Routes>
  );
};

export default AdminRoutes;
