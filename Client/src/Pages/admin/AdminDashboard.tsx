

import SidebarLayout from "../../Components/Layouts/Admin/SidebarLayout";

import Admin_Navbar from "../../Components/Layouts/Admin_Navbar";
import DashboardPage from "../../Components/Component/Admin/AdminDashboardComponent";
import ReusableWarningModal from "../../Components/Elements/Reusable/ResusableWarningModal";
import { useState } from "react";
import { getActivePlanByRestaurant } from "../../services/planService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store/store";
import { useQuery } from "@tanstack/react-query";
import menuItems from "../../Components/Elements/Reusable/MenuItems";
export default function Dashboard() {
  const navigate = useNavigate();
  const RestaurantId = useSelector(
    (state: RootState) => state.auth.admin?._id as string
  );

  const [dismissed, setDismissed] = useState(true);

  const { data, isLoading } = useQuery({
    queryKey: ["activePlan", RestaurantId],
    queryFn: () => getActivePlanByRestaurant(RestaurantId),
  });
  const modalOpen = !isLoading && !data?.data?.success;
  const handleConfirm = () => {
    navigate("/admin/subscriptionplan");
    setDismissed(false);
  };

  const handleCancel = () => {
    console.log("User cancelled!");
    setDismissed(false);
  };

  return (
    <div>
      {modalOpen && dismissed && (
        <ReusableWarningModal
          isOpen={modalOpen}
          title="Upgrade Your Plan"
          message="To access premium analytics & reporting, upgrade your subscription now."
          confirmText="Upgrade Now"
          cancelText="Not Now"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
      <Admin_Navbar role={"admin"} />
      <SidebarLayout menuItems={menuItems} active="Dashboard">
        <DashboardPage />
      </SidebarLayout>
    </div>
  );
}
