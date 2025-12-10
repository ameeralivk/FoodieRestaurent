import React from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface MenuItem {
  name: string;
  icon: React.ElementType;
  path?: string;
}

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activeItem: string;
  setActiveItem: (item: string) => void;
  menuItems: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  activeItem,
  setActiveItem,
  menuItems,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-16"
      } bg-black h-screen transition-all duration-300  ease-in-out fixed left-0 top-0 z-50 shadow-xl`}
    >
      {/* Toggle Button */}
      <div className="flex items-center justify-between p-[13px] border-b border-slate-700">
        {isOpen && <h2 className="text-white font-bold text-xl">Menu</h2>}
        <button
          onClick={onToggle}
          className="text-white hover:bg-slate-800 p-2 rounded-lg transition-colors"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              onClick={() => {
                setActiveItem(item.name);
                navigate(item.path ? item.path : "");
              }}
              className={`w-full flex items-center gap-4 px-4 py-3 text-gray-300 hover:bg-slate-800 hover:text-white transition-all ${
                activeItem === item.name
                  ? "bg-slate-800 text-white border-l-4 border-blue-500"
                  : ""
              }`}
            >
              <Icon size={20} />
              {isOpen && <span>{item.name}</span>}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
