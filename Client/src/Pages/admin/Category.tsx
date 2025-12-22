import menuItems from "../../Components/Elements/Reusable/MenuItems";
import SidebarLayout from "../../Components/Layouts/Admin/SidebarLayout";
import Admin_Navbar from "../../Components/Layouts/Admin_Navbar";
import CategoryComponent from "../../Components/Component/Admin/CategoryComponent";
import type { RootState } from "../../redux/store/store";
import { useSelector } from "react-redux";
SidebarLayout;
const Category = () => {
  const restaurentName = useSelector(
    (state: RootState) => state?.auth?.admin?.restaurantName
  );
  return (
    <div>
      <Admin_Navbar role={"admin"} restaurantName={restaurentName} />
      <SidebarLayout menuItems={menuItems} active="Category">
        <CategoryComponent />
      </SidebarLayout>
    </div>
  );
};

export default Category;
