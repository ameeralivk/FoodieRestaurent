import { Route, Routes } from "react-router-dom";
import DashboardPage from "../Pages/superAdmin/Dashboard";
import SuperAdminRoute from "./SuperAdmin/SuperAdminPrivateRoute";
import ApprovalPage from "../Pages/superAdmin/ApprovalPage";
const SuperAdminRoutes = () => {
  return (
    <div>
     <Routes>
  {/* Superadmin-protected routes */}
  <Route element={<SuperAdminRoute />}>
    <Route path="/" element={<DashboardPage />} />
    <Route path="/approval" element={<ApprovalPage />} />
  </Route>
</Routes>
    </div>
  );
};

export default SuperAdminRoutes;
