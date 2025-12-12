
import Admin_Navbar from '../../Components/Layouts/Admin_Navbar'
import SidebarLayout from '../../Components/Layouts/Admin/SidebarLayout'
import StaffManagementPage from '../../Components/Component/Admin/StaffComponent'
import menuItems from '../../Components/Elements/Reusable/MenuItems'
const StaffManagement = () => {

  return (
     <div>
     <Admin_Navbar role={"admin"} />
      <SidebarLayout menuItems={menuItems} active="Staff">
        <StaffManagementPage />
      </SidebarLayout>

    </div>
  )
}

export default StaffManagement