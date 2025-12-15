import {
  Home,
  Crown,
  Users,
  BarChart3,
  FileText,
  Settings,
  Table,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: Home, path: "/admin/dashboard" },
  { name: "Subscription", icon: Crown, path: "/admin/subscriptionplan" },
  { name: "Staff", icon: Users, path: "/admin/staff" },
  { name: "Table", icon: Table, path: "/admin/table" },
  { name: "Analytics", icon: BarChart3 },
  { name: "Documents", icon: FileText },
  { name: "Settings", icon: Settings },
];

export default menuItems;
