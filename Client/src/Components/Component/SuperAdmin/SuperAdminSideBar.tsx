import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, Clock, CreditCard, Building2, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const SuperAdminSidebar: React.FC<SidebarProps> = ({
  isOpen = true,
  onClose,
}) => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const navigate = useNavigate();
   const location = useLocation();
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/superadmin" },
    { name: "Pending Request", icon: Clock, path: "/superadmin/approval" },
    {
      name: "Restaurant Management",
      icon: Building2,
      path: "/superadmin/restaurent",
    },
    {
      name: "Subscription",
      icon: CreditCard,
      path: "/superadmin/subscription",
    },
  ];


  useEffect(() => {
    const current = menuItems.find((item) => item.path === location.pathname);
    if (current) {
      setActiveItem(current.name);
    }
  }, [location.pathname]);



  return (
    <>

      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      <aside
        className={`
        fixed md:sticky top-0 left-0 h-screen bg-neutral-900 border-r border-neutral-800 
        transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        w-64
      `}
      >
        <div className="p-6">
          <button
            className="md:hidden absolute top-4 right-4 text-neutral-400 hover:text-white"
            onClick={onClose}
          >
            <X size={24} />
          </button>

          <div className="space-y-2 mt-8 md:mt-0">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.name;

              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveItem(item.name);
                    navigate(item.path);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg transition
                    ${
                      isActive
                        ? "bg-neutral-800 text-white"
                        : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                    }
                  `}
                >
                  <Icon size={20} />
                  <span className="text-sm">{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
};

export default SuperAdminSidebar;
