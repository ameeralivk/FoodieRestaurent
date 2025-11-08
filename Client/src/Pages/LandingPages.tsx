import Admin_Navbar from "../Components/Layouts/Admin_Navbar";
import { Instagram, Twitter, Facebook } from "lucide-react";
import Button from "../Components/Elements/Button";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const navigate = useNavigate();
  const handleRestaurentButton = () => {
    console.log("hi");
    navigate("/admin/Login");
  };
  const handleUserButton = () => {
    console.log("hi");
    navigate("/user/Login");
  };
  return (
    <div className="w-screen h-screen flex flex-col overflow-x-hidden">
      <div>
        <Admin_Navbar role={"login"} />
      </div>
      <div className="bg-[url('/pexels-andrea-prochilo-3062027-34575931.jpg')] bg-cover bg-center bg-no-repeat w-screen h-screen">
        <div className="w-full h-full flex justify-center items-center flex-col gap-2">
          <h1 className="text-amber-600 e text-6xl font-extrabold">
            Welcome to Foodie Palace
          </h1>
          <div className="w-[750px] ml-2">
            <p className="text-amber-200 mb-12">
              Streamline your restaurant’s daily operations with StaffScan, an
              effortless way to manage and monitor your team. With just one
              quick scan, access staff details, track attendance, and keep your
              restaurant running smoothly — all from one smart dashboard.
            </p>
          </div>
          <div className="flex gap-4">
            <Button text="Restaurent Owner" onClick={handleRestaurentButton} />
            <Button text="User Login" onClick={handleUserButton} />
          </div>
        </div>
        <div className="h-[150px] bg-black flex justify-center items-center">
          <div className="flex flex-col">
            <div className="flex justify-center gap-6 mb-4 text-[#BAB09E]">
              <Facebook className="cursor-pointer hover:scale-120" />
              <Twitter className="cursor-pointer hover:scale-120" />
              <Instagram className="cursor-pointer hover:scale-120" />
            </div>
            <p className="text-[#BAB09E] underline hover:text-blue-600 cursor-pointer">
              @2024 Foodie Palace. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
