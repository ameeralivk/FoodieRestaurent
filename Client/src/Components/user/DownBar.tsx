import React, { useState } from "react";
import { Home, User, ShoppingCart, Wallet, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  path?: string;
}

interface BottomNavBarProps {
  items?: NavItem[];
  onItemClick?: (id: string) => void;
  activeColor?: string;
  inactiveColor?: string;
  defaultActive?: string;
  restaurantId?: string;
  tableNo?: string;
}
const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeColor = "text-orange-600",
  inactiveColor = "text-gray-400",
  defaultActive = "home",
  restaurantId,
  tableNo,
}) => {
  const defaultItems: NavItem[] = [
    {
      id: "home",
      label: "Home",
      icon: <Home size={24} strokeWidth={2.5} />,
      path: `/user/restaurant/${restaurantId}?table=${tableNo}`,
    },
    {
      id: "Orders",
      label: "Orders",
      icon: <ShoppingBag size={24} strokeWidth={2.5} />,
      path: "/user/order",
    },
    {
      id: "cart",
      label: "Cart",
      icon: <ShoppingCart size={24} strokeWidth={2.5} />,
      path: `/user/${restaurantId}/cart`,
    },
    {
      id: "profile",
      label: "Profile",
      icon: <User size={24} strokeWidth={2.5} />,
      path: "/user/profile",
    },
    {
      id: "wallet",
      label: "Wallet",
      icon: <Wallet size={24} strokeWidth={2.5} />,
      path: "/user/wallet",
    },
  ];

  const [activeItem, setActiveItem] = useState(defaultActive);
  const navigate = useNavigate();
  const handleItemClick = (item: NavItem) => {
    setActiveItem(item.id);
    if (!item.path) return;
    navigate(item.path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-50 pb-safe">
      <nav className="flex justify-around items-center h-20 max-w-md mx-auto px-2">
        {defaultItems.map((item) => {
          const isActive = activeItem === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`group relative flex flex-col items-center justify-center gap-1 w-full h-full transition-all duration-300 ${isActive ? activeColor : inactiveColor
                }`}
            >
              <div
                className={`p-2 rounded-2xl transition-all duration-300 ${isActive
                    ? "bg-orange-50 -translate-y-2 shadow-sm"
                    : "hover:bg-gray-50 mb-0"
                  }`}
              >
                {item.icon}
              </div>
              <span className={`text-[10px] font-bold transition-all duration-300 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 absolute"
                }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomNavBar;
