import { ChefHat, User, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showConfirm } from "../../Elements/ConfirmationSwall";
import Swal from "sweetalert2";
import { logoutRequest } from "../../../services/Auth";
import { userLogoutAction } from "../../../redux/slice/userSlice";
import type{ RootState } from "../../../redux/store/store";
interface NavbarProps {
  restaurantName?: string;
}
const Navbar = ({ restaurantName }: NavbarProps) => {
  const imageUrl = useSelector(
    (state: RootState) => state.userAuth.user?.imageUrl
  );
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
        navigate("/user/login");
        Swal.fire("Logged out!", "You have been logged out.", "success");
      }
    }
  };
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-12xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <ChefHat className="w-6 h-6 text-gray-700" />
            <h1 className="text-xl font-bold text-gray-900">
              {restaurantName}
            </h1>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                {/* <User
                  onClick={() => {
                    navigate("/user/profile");
                  }}
                  className="w-5 h-5 text-gray-600"
                /> */}
                <img
                  src={imageUrl || "/default-avatar.png"}
                  alt="Profile"
                  onClick={() => navigate("/user/profile")}
                  className="w-8 h-8 rounded-full object-cover cursor-pointer"
                />
              </div>
            </button>
            <LogOut onClick={handleLogout} className=" cursor-pointer" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
