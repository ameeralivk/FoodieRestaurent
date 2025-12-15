import Admin_Navbar from "../../Components/Layouts/Admin_Navbar";
import SidebarLayout from "../../Components/Layouts/Admin/SidebarLayout";
import TableComponent from "../../Components/Component/Admin/TableComponent";
import menuItems from "../../Components/Elements/Reusable/MenuItems";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store/store";

const TableManagement = () => {
   const restaurentName = useSelector(
    (state: RootState) => state?.auth?.admin?.restaurantName
  );
  return (
    <div>
      <Admin_Navbar role={"admin"} restaurantName={restaurentName} />
      <SidebarLayout menuItems={menuItems} active="Table">
       <TableComponent/>
      </SidebarLayout>
    </div>
  );
};

export default TableManagement;