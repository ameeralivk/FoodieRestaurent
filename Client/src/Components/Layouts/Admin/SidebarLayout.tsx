// import React, { useState } from "react";
// import Sidebar from "../../Elements/Reusable/AdminSideBar";
// import type { MenuItem } from "../../Elements/Reusable/AdminSideBar";
// import { useSidebar } from "../../../Context/SidabarContext";

// interface SidebarLayoutProps {
//   children: React.ReactNode;
//   active: string;
//   menuItems: MenuItem[];
// }

// const SidebarLayout: React.FC<SidebarLayoutProps> = ({
//   children,
//   active,
//   menuItems,
// }) => {
//   const { isOpen, toggleSidebar } = useSidebar();
//   const [activeItem, setActiveItem] = useState(active || "");

//   return (
//     <div className="bg-black min-h-screen">
//       <Sidebar
//         isOpen={isOpen}
//         onToggle={() => toggleSidebar()}
//         menuItems={menuItems}
//         activeItem={activeItem}
//         setActiveItem={setActiveItem}
//       />

//       {/* Main content */}
//       <div
//         className={`transition-all duration-300 p-8 ${
//           isOpen ? "ml-64" : "ml-16"
//         }`}
//       >
//         {children}
//       </div>
//     </div>
//   );
// };

// export default SidebarLayout;


import React, { useState } from "react";
import Sidebar from "../../Elements/Reusable/AdminSideBar";
import type { MenuItem } from "../../Elements/Reusable/AdminSideBar";
import { useSidebar } from "../../../Context/SidabarContext";

type Theme = "light" | "dark";

interface SidebarLayoutProps {
  children: React.ReactNode;
  active: string;
  menuItems: MenuItem[];
  theme?: Theme;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  children,
  active,
  menuItems,
  theme = "dark",
}) => {
  const { isOpen, toggleSidebar } = useSidebar();
  const [activeItem, setActiveItem] = useState(active);

  const layoutClasses =
    theme === "dark"
      ? "bg-neutral-950 text-white"
      : "bg-gray-100 text-gray-900";

  return (
    <div className={`min-h-screen w-full transition-colors ${layoutClasses}`}>
      {/* Sidebar */}
      <Sidebar
        isOpen={isOpen}
        onToggle={toggleSidebar}
        menuItems={menuItems}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        theme={theme}
      />

      {/* Main Content */}
      <main
        className={`
          transition-all duration-300 ease-in-out
          pt-6 px-6
          ${isOpen ? "ml-64" : "ml-16"}
        `}
      >
        {children}
      </main>
    </div>
  );
};

export default SidebarLayout;


