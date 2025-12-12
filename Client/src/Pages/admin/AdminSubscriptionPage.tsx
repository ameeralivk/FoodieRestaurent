import SidebarLayout from "../../Components/Layouts/Admin/SidebarLayout";
import menuItems from "../../Components/Elements/Reusable/MenuItems";
import Admin_Navbar from "../../Components/Layouts/Admin_Navbar";
import AdminSubscriptionPlans from "../../Components/Component/Admin/SubscriptionComponent";
export default function AdminSubscriptionPage() {
  return (
    <div>
      <Admin_Navbar role={"admin"} />
      <SidebarLayout menuItems={menuItems} active="Subscription">
        <AdminSubscriptionPlans />
      </SidebarLayout>
    </div>
  );
}
