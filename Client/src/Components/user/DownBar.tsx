import React, { useState } from "react";
import {
  Home,
  User,
  ShoppingCart,
  Heart,
  ShoppingCartIcon,
} from "lucide-react";
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
  activeColor = "text-blue-600",
  inactiveColor = "text-gray-600",
  defaultActive = "home",
  restaurantId,
  tableNo,
}) => {
  const defaultItems: NavItem[] = [
    {
      id: "home",
      label: "Home",
      icon: <Home size={24} />,
      path: `/user/restaurant/${restaurantId}?table=${tableNo}`,
    },
    {
      id: "Orders",
      label: "Orders",
      icon: <ShoppingCart size={24} />,
      path: "/user/order",
    },
    {
      id: "cart",
      label: "Cart",
      icon: <ShoppingCart size={24} />,
      path: `/user/${restaurantId}/cart`,
    },
    {
      id: "profile",
      label: "Profile",
      icon: <User size={24} />,
      path: "/user/profile",
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
    <div className="w-full bg-white border-t border-gray-200 shadow-sm">
      <nav className="flex justify-around items-center h-20 max-w-screen-xl mx-auto">
        {defaultItems.map((item) => {
          const isActive = activeItem === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors duration-200 ${
                activeItem === item.id ? activeColor : inactiveColor
              }`}
            >
              <div>{item.icon}</div>
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomNavBar;
