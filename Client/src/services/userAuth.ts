import api from "./Api";
import { showErrorToast } from "../Components/Elements/ErrorToast";
import { AxiosError } from "axios";
import axios from "axios";
import type { AppDispatch } from "../redux/store/store";
import { useGoogleLogin } from "@react-oauth/google";
import { showSuccessToast } from "../Components/Elements/SuccessToast";
import type { AdminType } from "../types/AdminTypes";
import { userLoginAction } from "../redux/slice/userSlice";
export const handleUserLogin = async (email: string, password: string) => {
  try {
    let data = { email, password };
    const response = await api.post("/user/auth/login", data, {
      withCredentials: true,
    });
    if (response) {
      return response.data;
    } else {
      showErrorToast("Something wentWrong");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data.message;
      showErrorToast(message);
      return;
    } else if (error instanceof Error) {
      showErrorToast(error.message);
    } else {
      showErrorToast("An unknown error occurred");
    }
    throw new Error("Something went wrong. Please try again.");
  }
};

export const handleUserRegister = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    let data = { name, email, password };
    const response = await api.post("/user/auth/register", data, {
      withCredentials: true,
    });
    if (response) {
      return response.data;
    } else {
      showErrorToast("Something wentWrong");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data.message;
      showErrorToast(message);
      return;
    } else if (error instanceof Error) {
      showErrorToast(error.message);
    } else {
      showErrorToast("An unknown error occurred");
    }
    throw new Error("Something went wrong. Please try again.");
  }
};

export const userVerifyOtp = async (otp: string, email: string) => {
  try {
    let data = { otp: otp, email: email };
    const response = await api.post("/user/auth/verify-otp", data, {
      withCredentials: true,
    });
    console.log(response.data, "fdalfdajk");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("SignUp Error:", error.response);
      throw new Error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
    throw new Error("Something went wrong. Please try again.");
  }
};

export const userResendOtp = async (email: string) => {
  try {
    let data = { email };
    const response = await api.post("/user/auth/resent-otp", data, {
      withCredentials: true,
    });
    console.log(response.data, "fdalfdajk");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("SignUp Error:", error.response);
      throw new Error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
    throw new Error("Something went wrong. Please try again.");
  }
};

export const userGoogleLoginHandler = (dispatch: AppDispatch) => {
  return useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await api.post("/user/auth/googleAuth", {
          token: tokenResponse.access_token,
        });
        console.log(res.data, "data is here");
        if (res.data.success) {
          console.log(res.data, "data is here");
          const access_token = res.data.accesstoken;

          const saveddata: AdminType = {
            _id: res.data.data._id,
            restaurantName: res.data.data.restaurantName,
            email: res.data.data.email,
            role: res.data.data.role,
            googleId: res.data.data.googleId,
            imageUrl: res.data.data.imageUrl,
            status: res.data.data.status,
          };

          dispatch(
            userLoginAction({
              user: saveddata,
              token: access_token,
            })
          );

          showSuccessToast("Google login successful!");
        } else {
          showErrorToast("Google authentication failed!");
        }
      } catch (err) {
        showErrorToast("Google login failed!");
      }
    },
    onError: () => showErrorToast("Google authentication failed"),
  });
};
