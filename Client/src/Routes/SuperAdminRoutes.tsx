import { Route, Routes } from "react-router-dom";
import DashboardPage from "../Pages/superAdmin/Dashboard";
import SuperAdminRoute from "./SuperAdmin/SuperAdminPrivateRoute";
import ApprovalPage from "../Pages/superAdmin/ApprovalPage";
import SubscriptionPage from "../Pages/superAdmin/Subscription";
const SuperAdminRoutes = () => {
  return (
    <div>
      <Routes>
        {/* Superadmin-protected routes */}
        <Route element={<SuperAdminRoute />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/approval" element={<ApprovalPage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default SuperAdminRoutes;
