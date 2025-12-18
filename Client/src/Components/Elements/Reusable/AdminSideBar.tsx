
import React from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface MenuItem {
  name: string;
  icon: React.ElementType;
  path?: string;
}

export type Theme = "dark" | "light";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activeItem: string;
  setActiveItem: (item: string) => void;
  menuItems: MenuItem[];
  theme: Theme;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  activeItem,
  setActiveItem,
  menuItems,
  theme,
}) => {
  const navigate = useNavigate();

  /* ---------- REAL-WORLD STAFF THEMES ---------- */

  const sidebarBg =
    theme === "dark"
      ? "bg-neutral-950 text-white"
      : "bg-[#F8FAFC] text-slate-800 border-r border-slate-200";

  const itemBase =
    theme === "dark"
      ? "text-gray-300 hover:bg-slate-800 hover:text-white"
      : "text-slate-600 hover:bg-slate-200 hover:text-slate-900";

  const activeItemStyle =
    theme === "dark"
      ? "bg-slate-800 text-white border-l-4 border-blue-500"
      : "bg-white text-slate-900 border-l-4 border-indigo-500 shadow-sm";

  const toggleHover =
    theme === "dark" ? "hover:bg-slate-800" : "hover:bg-slate-200";

  const headerBorder =
    theme === "dark" ? "border-slate-800" : "border-slate-200";

  /* -------------------------------------------- */

  return (
    <aside
      className={`
        fixed left-0 top-0 z-50 h-screen
        ${isOpen ? "w-64" : "w-16"}
        ${sidebarBg}
        transition-all duration-300 ease-in-out
        shadow-lg
      `}
    >
      {/* Header */}
      <div className={`flex items-center px-4 py-3 border-b ${headerBorder}`}>
        <button
          onClick={onToggle}
          className={`ml-auto p-2 rounded-md transition-colors ${toggleHover}`}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.name;

          return (
            <button
              key={item.name}
              onClick={() => {
                setActiveItem(item.name);
                navigate(item.path ?? "");
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-2.5
                text-sm font-medium
                transition-all duration-200
                ${itemBase}
                ${isActive ? activeItemStyle : ""}
              `}
            >
              <Icon size={18} />
              {isOpen && <span>{item.name}</span>}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
