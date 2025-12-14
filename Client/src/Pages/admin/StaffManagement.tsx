import Admin_Navbar from "../../Components/Layouts/Admin_Navbar";
import SidebarLayout from "../../Components/Layouts/Admin/SidebarLayout";
import StaffManagementPage from "../../Components/Component/Admin/StaffComponent";
import menuItems from "../../Components/Elements/Reusable/MenuItems";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store/store";

const StaffManagement = () => {
   const restaurentName = useSelector(
    (state: RootState) => state?.auth?.admin?.restaurantName
  );
  return (
    <div>
      <Admin_Navbar role={"admin"} restaurantName={restaurentName} />
      <SidebarLayout menuItems={menuItems} active="Staff">
        <StaffManagementPage />
      </SidebarLayout>
    </div>
  );
};

export default StaffManagement;
