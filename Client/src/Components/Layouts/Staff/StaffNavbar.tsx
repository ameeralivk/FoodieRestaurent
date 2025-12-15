import { ChefHat, User, LogOut, Bell } from "lucide-react";
import { showConfirm } from "../../Elements/ConfirmationSwall";
import { useDispatch } from "react-redux";
import { userLogoutAction } from "../../../redux/slice/userSlice";
import { logoutRequest } from "../../../services/Auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const StaffNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const confirmed = await showConfirm(
      "Logout",
      "Do you really want to logout?",
      "Logout",
      "Cancel"
    );

    if (confirmed) {
      const res = await logoutRequest();
      if (res) {
        dispatch(userLogoutAction());
        navigate("/staff/login");
        Swal.fire("Logged out!", "You have been logged out.", "success");
      }
    }
  };
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <ChefHat className="w-6 h-6 text-gray-700" />
            <h1 className="text-xl font-bold text-gray-900">DineEasy</h1>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <Bell className="w-5 h-5 text-gray-600" />
              </div>
            </button>
            <button className=" hover:bg-gray-100 rounded-full transition-colors">
              <img
                className="w-8 h-8 rounded-4xl"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL60p-Cv5yRHtLK2z80SyuAFy8Qskexvs0AQ&s"
                alt="Extra small avatar"
              ></img>
            </button>
            <LogOut onClick={handleLogout} className=" cursor-pointer" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default StaffNavbar;
