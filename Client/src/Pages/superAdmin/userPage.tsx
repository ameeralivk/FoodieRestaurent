import SuperAdminNavbar from "../../Components/Component/SuperAdmin/SuperAdminNavbar";
import SuperAdminSidebar from "../../Components/Component/SuperAdmin/SuperAdminSideBar";
import UserPage from "../../Components/Component/SuperAdmin/UserPage";
const SuperAdminUserPage = () => {
  return (
    <div className="flex flex-col h-screen bg-black">
      {/* Navbar */}
      <div className="shrink-0">
        <SuperAdminNavbar />
      </div>

      {/* Main Content Wrapper */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (left) */}
        <div className="w-64 shrink-0">
          <SuperAdminSidebar />
        </div>

        <div className="flex-1 bg-neutral-900 p-6 overflow-y-auto">
          <div className="bg-neutral-900 text-amber-50 w-full h-full rounded-xl">
            <UserPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminUserPage;
