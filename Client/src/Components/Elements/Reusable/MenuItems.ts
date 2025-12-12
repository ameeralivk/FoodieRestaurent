import {
  Home,
  Crown,
  Users,
  BarChart3,
  FileText,
  Settings,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: Home, path: "/admin/dashboard" },
  { name: "Subscription", icon: Crown, path: "/admin/subscriptionplan" },
  { name: "Staff", icon: Users, path: "/admin/staff" },
  { name: "Analytics", icon: BarChart3 },
  { name: "Documents", icon: FileText },
  { name: "Settings", icon: Settings },
];

export default menuItems;
