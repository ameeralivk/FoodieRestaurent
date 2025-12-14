import SidebarLayout from "../../Components/Layouts/Admin/SidebarLayout";
import menuItems from "../../Components/Elements/Reusable/MenuItems";
import Admin_Navbar from "../../Components/Layouts/Admin_Navbar";
import AdminSubscriptionPlans from "../../Components/Component/Admin/SubscriptionComponent";
import { useSelector } from "react-redux";
import type{ RootState } from "../../redux/store/store";
export default function AdminSubscriptionPage() {
   const restaurentName = useSelector(
    (state: RootState) => state?.auth?.admin?.restaurantName
  );
  return (
    <div>
      <Admin_Navbar role={"admin"} restaurantName={restaurentName} />
      <SidebarLayout menuItems={menuItems} active="Subscription">
        <AdminSubscriptionPlans />
      </SidebarLayout>
    </div>
  );
}
