import SidebarLayout from "../../Components/Layouts/Admin/SidebarLayout";
import {
  Home,
  Users,
  BarChart3,
  FileText,
  Settings,
  Crown,
} from "lucide-react";
import Admin_Navbar from "../../Components/Layouts/Admin_Navbar";
import AdminSubscriptionPlans from "../../Components/Component/Admin/SubscriptionComponent";
export default function AdminSubscriptionPage() {
  const menuItems = [
    { name: "Dashboard", icon: Home, path: "/admin/dashboard" },
    { name: "Subscription", icon: Crown, path: "/admin/subscriptionplan" },
    { name: "Users", icon: Users },
    { name: "Analytics", icon: BarChart3 },
    { name: "Documents", icon: FileText },
    { name: "Settings", icon: Settings },
  ];

  return (
    <div>
      <Admin_Navbar role={"admin"} />
      <SidebarLayout menuItems={menuItems} active="Subscription">
        <AdminSubscriptionPlans />
      </SidebarLayout>
    </div>
  );
}
