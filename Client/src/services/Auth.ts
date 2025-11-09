import axios from "axios";

interface registerFormData {
  restaurantName: string;
  email: string;
  password: string;
}

export const register = async (formData: registerFormData) => {
  try {
    console.log(formData, "data");
    const response = await axios.post(
      "http://localhost:3000/api/admin/auth/signup",
      formData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "An unknown error occurred"
    );
  }
};




