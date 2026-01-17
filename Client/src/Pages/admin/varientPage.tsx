import menuItems from "../../Components/Elements/Reusable/MenuItems";
import SidebarLayout from "../../Components/Layouts/Admin/SidebarLayout";
import Admin_Navbar from "../../Components/Layouts/Admin_Navbar";
import type { RootState } from "../../redux/store/store";
import { useSelector } from "react-redux";
import VarientComponent from "../../Components/Component/Admin/VarientComponent";
SidebarLayout;
const VarientPage = () => {
  const restaurentName = useSelector(
    (state: RootState) => state?.auth?.admin?.restaurantName,
  );
  return (
    <div>
      <Admin_Navbar role={"admin"} restaurantName={restaurentName} />
      <SidebarLayout menuItems={menuItems} active="Varients">
        <VarientComponent />
      </SidebarLayout>
    </div>
  );
};

export default VarientPage;
