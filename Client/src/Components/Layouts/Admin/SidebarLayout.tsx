import React, { useState } from "react";
import Sidebar from "../../Elements/Reusable/AdminSideBar";
import type { MenuItem } from "../../Elements/Reusable/AdminSideBar";
import { useSidebar } from "../../../Context/SidabarContext";

interface SidebarLayoutProps {
  children: React.ReactNode;
  active: string;
  menuItems: MenuItem[];
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  children,
  active,
  menuItems,
}) => {
  const { isOpen, toggleSidebar } = useSidebar();
  const [activeItem, setActiveItem] = useState(active || "");

  return (
    <div className="bg-black min-h-screen">
      <Sidebar
        isOpen={isOpen}
        onToggle={() => toggleSidebar()}
        menuItems={menuItems}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />

      {/* Main content */}
      <div
        className={`transition-all duration-300 p-8 ${
          isOpen ? "ml-64" : "ml-16"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default SidebarLayout;
