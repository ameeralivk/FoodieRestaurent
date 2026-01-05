import { Route, Routes } from "react-router-dom";
import LandingPage from "../Pages/LandingPages";
import ResetPasswordPage from "../Pages/auth/forgetPasswordResetPage";
import PageNotFound from "../Pages/auth/PageNotFound";
const LandingPagesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/*" element={<PageNotFound />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
    </Routes>
  );
};

export default LandingPagesRoutes;
