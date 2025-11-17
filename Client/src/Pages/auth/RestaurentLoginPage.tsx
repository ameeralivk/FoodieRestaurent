import Admin_Navbar from "../../Components/Layouts/Admin_Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { showErrorToast } from "../../Components/Elements/ErrorToast";
import { handleLogin } from "../../services/Auth";
import { ToastContainer } from "react-toastify";
import WarningSwal from "../../Components/Helpers/WarningSwal";
import ErrorPTag from "../../Components/Elements/ErrorParagraph";
import type { AdminType } from "../../types/AdminTypes";
import { loginAction } from "../../redux/slice/adminSlice";
import { useGoogleLoginHandler } from "../../services/Auth";
import { useDispatch } from "react-redux";
import { GoogleLoginButton } from "../../Components/Elements/googleLoginButton";
import AdminRegisterValidation, {
  validateLoginForm,
} from "../../Validation/AdminRegistractiorValidation";
const RestaurentLoginPage = () => {
  interface FormData {
    email: string;
    password: string;
  }
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [error, setError] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const navigate = useNavigate();
  const nav = () => {
    navigate("/Admin/Register");
  };
  // const dispatch = useDispatch();
  // const googleLogin = useGoogleLoginHandler(dispatch);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const validation = AdminRegisterValidation(name as keyof FormData, value);
    setError((prev) => ({ ...prev, [name]: validation || "" }));
  };

  const handleLoginButton = async () => {
    try {
      const valid = validateLoginForm(formData);
      let len = Object.keys(valid.errors).length;
      if (len > 0) {
        for (let key in valid.errors) {
          const field = key as keyof FormData;
          setError((prev) => ({ ...prev, [field]: valid.errors[field] || "" }));
        }
        WarningSwal({ message: "Please File all the Field to Proceed" });
        return;
      }

      const response = await handleLogin(formData.email, formData.password);
      console.log(response.admin);
      const saveddata: AdminType = {
        _id: response.admin._id,
        restaurantName: response.admin.restaurantName,
        email: response.admin.email,
        role: response.admin.role,
        googleId: response.admin.googleId,
        imageUrl: response.admin.imageUrl,
        status: response.admin.status,
      };

      dispatch(
        loginAction({
          admin: saveddata,
          token: response.token,
        })
      );

    if (saveddata.role === "superadmin") {
      navigate("/superadmin/dashboard");
    } else {
      navigate("/admin/onboarding");
    }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error, "error");
      } else {
        showErrorToast(String(error));
      }
    }
  };
  const googleLogin = useGoogleLoginHandler(dispatch);
  return (
    <div className="bg-black min-h-screen">
      <div className=" sticky top-0">
        <Admin_Navbar role={"register"} />
      </div>
      <ToastContainer />
      <div className="relative z-10 flex justify-center items-center h-[calc(100vh-80px)] px-4">
        <div className="bg-slate-900/80 backdrop-blur-md w-full max-w-sm rounded-xl border border-amber-400/40 text-white p-8 shadow-2xl">
          <h1 className="text-3xl font-semibold text-amber-400 mb-6 text-center">
            Restaurant Login
          </h1>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col text-left">
              <label className="mb-1 text-sm font-medium">
                Restaurant Email
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                type="text"
                placeholder="Enter your restaurant name"
                className="border border-amber-400/50 bg-transparent rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-all"
              />
              <ErrorPTag Text={error.email} />
            </div>

            <div className="flex flex-col text-left">
              <label className="mb-1 text-sm font-medium">Password</label>
              <input
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                type="password"
                placeholder="Enter your password"
                className="border border-amber-400/50 bg-transparent rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-all"
              />
              <ErrorPTag Text={error.password} />
              <a
                onClick={() => navigate("/Admin/forgetPassword")}
                className="text-[13px]  text-blue-600 text-start cursor-pointer underline hover:text-blue-300"
              >
                Forget Your Password?
              </a>
            </div>
            {/* <button className="flex items-center h-[35px] justify-center gap-3 border border-gray-300 rounded-lg px-6 py-3 w-full hover:bg-gray-100 transition">
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
              <span className="font-medium text-gray-700">
                Sign in with Google
              </span>
            </button> */}
            {/* <div>
              <GoogleLoginButton login={googleLogin} />
            </div> */}
            <button
              onClick={handleLoginButton}
              type="submit"
              className="mt-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold py-2 rounded-md transition-all shadow-md"
            >
              Sign In
            </button>
            <GoogleLoginButton login={googleLogin} />
            <div className="text-sm text-center">
              <a
                onClick={nav}
                className="text-blue-400 hover:underline hover:text-blue-300 transition-colors cursor-pointer"
              >
                Don’t have an account? Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurentLoginPage;
