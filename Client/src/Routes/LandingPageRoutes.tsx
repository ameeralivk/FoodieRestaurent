import { Route, Routes } from "react-router-dom";
import LandingPage from "../Pages/LandingPages";
import PageNotFound from "../Pages/auth/PageNotFound";
const LandingPagesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};

export default LandingPagesRoutes;
