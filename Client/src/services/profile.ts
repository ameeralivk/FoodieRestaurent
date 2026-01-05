import { apiRequest } from "../api/apiRequest";

export const editProfile = async (
  userId: string,
  name: string,
  phone: string,
  email: string
): Promise<{ success: boolean; message: string; requiresOtp?: boolean }> => {
  return apiRequest("PUT", `/user/profile/${userId}`, { name, phone, email });
};

export const verifyOtp = async (
  email: string,
  otp: string
): Promise<{ success: boolean; message: string }> => {
  return apiRequest("POST", `/user/profile/verify-email-otp`, { email, otp });
};


export const passwordChange = async(userId:string,currentPassword:string,newPassword:string):Promise<{success:boolean,message:string}>=>{
  return apiRequest("POST",`/user/profile/${userId}`,{currentPassword,newPassword})
}


export const uploadProfileImage = async (
  userId: string,
  file: File
): Promise<{ success: boolean; message: string; imageUrl?: string }> => {
  const formData = new FormData();
  formData.append("profileImage", file); // MUST match multer field name

  return apiRequest(
    "PUT",
    `/user/profile/${userId}/image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    }
  );
};

