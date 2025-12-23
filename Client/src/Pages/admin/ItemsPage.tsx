import menuItems from "../../Components/Elements/Reusable/MenuItems";
import SidebarLayout from "../../Components/Layouts/Admin/SidebarLayout";
import Admin_Navbar from "../../Components/Layouts/Admin_Navbar";
import type { RootState } from "../../redux/store/store";
import { useSelector } from "react-redux";
import ItemComponent from "../../Components/Component/Admin/ItemComponent";
SidebarLayout;
const ItemsPage = () => {
  const restaurentName = useSelector(
    (state: RootState) => state?.auth?.admin?.restaurantName
  );
  return (
    <div>
      <Admin_Navbar role={"admin"} restaurantName={restaurentName} />
      <SidebarLayout menuItems={menuItems} active="Items">
        <ItemComponent/>
      </SidebarLayout>
    </div>
  );
};

export default ItemsPage;
