import React from "react";
import { useDispatch } from "react-redux";
import { Menu, Search, Bell, User, LogOut } from "lucide-react";
import { logoutAction } from "../../../redux/slice/adminSlice";
import { useNavigate } from "react-router-dom";

// Navbar Component
interface NavbarProps {
  onMenuClick?: () => void;
}
const SuperAdminNavbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function logout() {
    console.log("hi");
    dispatch(logoutAction());
    navigate("/admin/login");
  }
  return (
    <nav className="bg-neutral-900 border-b border-neutral-800 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
            <span className="text-white font-semibold text-lg">Foodie</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="text-white hover:text-amber-500 transition">
              Dashboard
            </a>
            <a
              href="#"
              className="text-neutral-400 hover:text-white transition"
            >
              Orders
            </a>
            <a
              href="#"
              className="text-neutral-400 hover:text-white transition"
            >
              Menu
            </a>
            <a
              href="#"
              className="text-neutral-400 hover:text-white transition"
            >
              Customers
            </a>
            <a
              href="#"
              className="text-neutral-400 hover:text-white transition"
            >
              Reports
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-neutral-400 hover:text-white transition">
            <Search size={20} />
          </button>
          <button className="text-neutral-400 hover:text-white transition">
            <Bell size={20} />
          </button>
          <button className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
            <User size={18} className="text-white" />
          </button>
          <button className="md:hidden text-white" onClick={onMenuClick}>
            <Menu size={24} />
          </button>
          <LogOut onClick={logout} color="white" />
        </div>
      </div>
    </nav>
  );
};

export default SuperAdminNavbar;
