import React, { useState } from "react";
import { ChefHat, Menu, X } from "lucide-react";
interface role {
  role: String;
}
const Admin_Navbar: React.FC<role> = ({ role }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="h-16 bg-black text-white border-b border-gray-700 sticky top-0 z-50 flex justify-between items-center px-6">
      {/* Left section - Logo */}
      <div className="flex items-center gap-3">
        <ChefHat size={22} className="text-[#EDAB12]" />
        <span className="cursor-pointer font-semibold tracking-wide text-sm sm:text-base">
          FOODIE PALACE
        </span>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-6 mr-6">
        {role !== "login" && role !== "register" ? (
          <>
            <li className="cursor-pointer hover:text-[#EDAB12] transition">
              Menu
            </li>
            <li className="cursor-pointer hover:text-[#EDAB12] transition">
              About
            </li>
            <li className="cursor-pointer hover:text-[#EDAB12] transition">
              Contact
            </li>
          </>
        ) : (
          ""
        )}

        <button className="bg-[#EDAB12] text-black font-medium w-20 rounded-md h-[30px] hover:bg-yellow-400 transition">
          Login
        </button>
        <button className="bg-[#383329] w-24 rounded-md h-[30px] hover:bg-[#4a4033] transition">
          Sign Up
        </button>
      </ul>

      <button
        className="md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle Menu"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-black border-t border-gray-800 flex flex-col items-center py-4 space-y-4 md:hidden">
          <li
            className="list-none cursor-pointer hover:text-[#EDAB12]"
            onClick={() => setMenuOpen(false)}
          >
            Menu
          </li>
          <li
            className="list-none cursor-pointer hover:text-[#EDAB12]"
            onClick={() => setMenuOpen(false)}
          >
            About
          </li>
          <li
            className="list-none cursor-pointer hover:text-[#EDAB12]"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </li>

          <button className="bg-[#EDAB12] text-black font-medium w-28 rounded-md h-[30px] hover:bg-yellow-400 transition">
            Login
          </button>
          <button className="bg-[#383329] w-32 rounded-md h-[30px] hover:bg-[#4a4033] transition">
            Sign Up
          </button>
        </div>
      )}
    </nav>
  );
};

export default Admin_Navbar;
