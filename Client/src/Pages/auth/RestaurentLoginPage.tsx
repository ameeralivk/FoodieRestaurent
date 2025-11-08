import Admin_Navbar from "../../Components/Layouts/Admin_Navbar";
import { useNavigate } from "react-router-dom";
const RestaurentLoginPage = () => {
  const navigate = useNavigate();
  const nav = () => {
    navigate("/Admin/Register");
  };
  return (
    <div className="bg-black min-h-screen">
      <div className=" sticky top-0">
        <Admin_Navbar role={"register"} />
      </div>

      <div className="relative z-10 flex justify-center items-center h-[calc(100vh-80px)] px-4">
        <div className="bg-slate-900/80 backdrop-blur-md w-full max-w-sm rounded-xl border border-amber-400/40 text-white p-8 shadow-2xl">
          <h1 className="text-3xl font-semibold text-amber-400 mb-6 text-center">
            Restaurant Login
          </h1>

          <form className="flex flex-col gap-4">
            <div className="flex flex-col text-left">
              <label className="mb-1 text-sm font-medium">
                Restaurant Name
              </label>
              <input
                type="text"
                placeholder="Enter your restaurant name"
                className="border border-amber-400/50 bg-transparent rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-all"
              />
            </div>

            <div className="flex flex-col text-left">
              <label className="mb-1 text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="border border-amber-400/50 bg-transparent rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-all"
              />
              <a
                onClick={() => navigate("/Admin/forgetPassword")}
                className="text-[13px]  text-blue-600 text-start cursor-pointer underline hover:text-blue-300"
              >
                Forget Your Password?
              </a>
            </div>
            <button className="flex items-center h-[35px] justify-center gap-3 border border-gray-300 rounded-lg px-6 py-3 w-full hover:bg-gray-100 transition">
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
              <span className="font-medium text-gray-700">
                Sign in with Google
              </span>
            </button>

            <button
              type="submit"
              className="mt-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold py-2 rounded-md transition-all shadow-md"
            >
              Sign In
            </button>
            <div className="text-sm text-center">
              <a
                onClick={nav}
                className="text-blue-400 hover:underline hover:text-blue-300 transition-colors cursor-pointer"
              >
                Don’t have an account? Sign Up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RestaurentLoginPage;
