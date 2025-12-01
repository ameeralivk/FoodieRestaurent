import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { showSuccessToast } from "../Components/Elements/SuccessToast";
import { showErrorToast } from "../Components/Elements/ErrorToast";
import { AxiosError } from "axios";
import api from "./Api";
import { loginAction } from "../redux/slice/adminSlice";
import type { AppDispatch } from "../redux/store/store";
import { toast } from "react-toastify";
import type { AdminType, resetPassword } from "../types/AdminTypes";
import { AfterLoading, loadingToast } from "../Components/Elements/Loading";
import { useNavigate } from "react-router-dom";
import type { RegisterFormData } from "../types/AdminTypes";
import type { ForgetPasswordFormData } from "../types/AdminTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
interface registerFormData {
  restaurantName: string;
  email: string;
  password: string;
}
export const register = async (formData: registerFormData) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/admin/auth/signup",
      formData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: unknown) {
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

export const verifyOtp = async (otp: string, email: string) => {
  try {
    let data = { otp: otp, email: email };
    const response = await api.post("/admin/auth/verify-otp", data, {
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

export const resendOtp = async (email: string) => {
  try {
    let data = { email };
    const response = await api.post("/admin/auth/resent-otp", data, {
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

export const useGoogleLoginHandler = (dispatch: AppDispatch) => {
  const navigate = useNavigate();
  return useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await api.post("/admin/auth/googleAuth", {
          token: tokenResponse.access_token,
        });
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
            loginAction({
              admin: saveddata,
              token: access_token,
            })
          );

          showSuccessToast("Google login successful!");

          navigate("/admin/onboarding");
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

export const handleLogin = async (email: string, password: string) => {
  try {
    let data = { email, password };
    const response = await api.post("/admin/auth/login", data, {
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

export const handleForgetPasswordSubmit = async (
  formData: ForgetPasswordFormData
) => {
  const loadingId = loadingToast();

  try {
    const response = await api.post("/admin/auth/forget-password", {
      email: formData.email,
    });

    // Update toast based on API response
    console.log(response, "res ");
    if (response.data.success || response.data.succes) {
      await AfterLoading(
        "Sending reset link...",
        response.data.message || "Password reset link sent successfully!"
      );
      toast.dismiss(loadingId);
    } else {
      toast.update(loadingId, {
        render: response.data.message || "Failed to send reset link!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      return false;
    }

    console.log(response.data, "response is here");
  } catch (error: any) {
    toast.update(loadingId, {
      render: axios.isAxiosError(error)
        ? error.response?.data?.message || "Something went wrong!"
        : error instanceof Error
        ? error.message
        : "An unknown error occurred",
      type: "error",
      isLoading: false,
      autoClose: 3000,
    });
  }
};

export const handleresetPasswordForm = async (
  resetPassword: resetPassword,
  role: "admin" | "user"
) => {
  try {
    const url =
      role === "admin"
        ? `/admin/auth/forget-password?token=${resetPassword.token}`
        : `/user/auth/forget-password?token=${resetPassword.token}`;

    const response = await api.patch(url, {
      email: resetPassword.email,
      newPassword: resetPassword.newPassword,
    });

    console.log(response, "res");

    if (response.data.success || response.data.succes) {
      return { success: true, message: response.data.message };
    }
  } catch (error: any) {
    const message = axios.isAxiosError(error)
      ? error.response?.data?.message || "Something went wrong!"
      : error instanceof Error
      ? error.message
      : "An unknown error occurred";

    showErrorToast(message);
  }
};

export const registerRestaurant = async (formData: RegisterFormData) => {
  try {
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (value instanceof File) {
          data.append(key, value);
        } else {
          data.append(key, value.toString());
        }
      }
    });
    for (const [key, value] of data.entries()) {
      console.log(key, value, "ready");
    }

    const response = await api.post("/admin/auth/on-boarding", data, {
      withCredentials: true,
    });
    showSuccessToast("Restaurant registered successfully!");
    return response.data;
  } catch (error: any) {
    showErrorToast(
      axios.isAxiosError(error)
        ? error.response?.data?.message || "Something went wrong!"
        : error.message
    );
    throw error;
  }
};

export const getStatus = async (adminId: string) => {
  try {
    const response = await api.get(`/admin/auth/getStatus/${adminId}`, {
      withCredentials: true,
    });
    return {
      status: response.data.status.status,
      rejectedAt: response.data.status.rejectedAt,
      reason: response.data.status.rejectionReason,
    };
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


export const updateDocument = async (adminId: string, file: File) => {
  try {
    const formData = new FormData();
    formData.append("proofDocument", file);

    const response = await api.put(
      `/admin/auth/update-doc/${adminId}`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Update Document Error:", error.response);
      throw new Error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
    throw new Error("Something went wrong. Please try again.");
  }
};
