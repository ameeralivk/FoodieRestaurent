import React, { useState } from "react";
import { ChevronRight, X } from "lucide-react";
import UserModal from "../../Components/Elements/Reusable/userModal";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store/store";
import {
  editProfile,
  passwordChange,
  uploadProfileImage,
  verifyOtp,
} from "../../services/profile";
import { useDispatch } from "react-redux";
import OtpVerificationPage from "../../Components/modals/user/otpVerification";
import { updateUser, updateUserField } from "../../redux/slice/userSlice";
import { showSuccessToast } from "../../Components/Elements/SuccessToast";
import { validateProfileForm } from "../../Validation/userProfileValidation";
import { ToastContainer } from "react-toastify";
import Navbar from "../../Components/Layouts/userLayouts/Navbar";
import BottomNavBar from "../../Components/user/DownBar";
import PasschangeModal from "../../Components/user/PasschangeModal";
import { Upload } from "lucide-react";
import { showConfirm } from "../../Components/Elements/ConfirmationSwall";
import { showErrorToast } from "../../Components/Elements/ErrorToast";
import { handleLogout } from "../../utils/logoutHandle";
import { useNavigate } from "react-router-dom";
interface ProfileFormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

export default function UserProfile() {
  const dispatch = useDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const email = useSelector((state: RootState) => state.userAuth.user?.email);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const imageUrl = useSelector(
    (state: RootState) => state.userAuth.user?.imageUrl
  );
  const [passFormData, setPassFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passErrors, setPassErrors] = useState<{
    oldPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  const user = useSelector((state: RootState) => state.userAuth.user);
  const name = useSelector((state: RootState) => state.userAuth.user?.name);
  const phone = useSelector((state: RootState) => state.userAuth.user?.phone);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const navigate = useNavigate();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const restaurantId = useSelector(
    (state: RootState) => state.userAuth.user?.restaurantId
  );
  const tableNo = useSelector(
    (state: RootState) => state.userAuth.user?.tableNo
  );
  const [errors, setErrors] = useState<ProfileFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  async function verifyOtpApi(otp: string) {
    console.log(otp);
    try {
      const result = await verifyOtp(formData.email as string, otp);
      if (result.success) {
        dispatch(
          updateUser({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
          })
        );
        showSuccessToast(result.message);
      }
    } catch (error) {
      console.log(error, "err");
      return;
    }
    setShowOtpModal(false);
  }

  const handlePassChange = () => {
    setIsPassModalOpen(true);
  };

  const handlePassInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordSave = async () => {
    const errors: typeof passErrors = {};

    if (!passFormData.oldPassword) {
      errors.oldPassword = "Old password is required";
    }

    if (!passFormData.newPassword) {
      errors.newPassword = "New password is required";
    }

    if (passFormData.newPassword !== passFormData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errors).length > 0) {
      setPassErrors(errors);
      return;
    }

    try {
      const res = await passwordChange(
        user?._id as string,
        passFormData.oldPassword,
        passFormData.newPassword
      );
      console.log(res, "res");
      if (res.success) {
        showSuccessToast("Password updated successfully");
        setIsPassModalOpen(false);
        setPassFormData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setPassErrors({});
      } else {
        showErrorToast(res.message);
      }
    } catch (err: any) {
      showErrorToast(err);
    }
  };

  async function resendOtpApi() {
    if (!user) return;
    const result = await editProfile(
      user._id,
      formData.name,
      formData.phone,
      formData.email
    );
    if (result.success) {
      showSuccessToast("otp resended Succcessfully");
    }
  }
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleEditClick = () => {
    setFormData({
      name: name || "",
      phone: phone || "",
      email: email || "",
    });

    console.log(formData, "data");
    setIsEditModalOpen(true);
  };

  const handleSave = async () => {
    const { isValid, errors } = validateProfileForm(formData);

    if (!isValid) {
      setErrors(errors);
      return;
    }

    if (!user?._id) return;

    const result = await editProfile(
      user._id,
      formData.name,
      formData.phone,
      formData.email
    );

    if (result?.success) {
      if (result.requiresOtp) {
        setShowOtpModal(true);
        setIsEditModalOpen(false);
        return;
      }
      dispatch(
        updateUser({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
        })
      );
      showSuccessToast(result.message);
    }
    console.log(result, "result");
    setIsEditModalOpen(false);
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const confirmed = await showConfirm(
      "Change the Profile Image?",
      `Are you sure you want to change the profileImage?`,
      "Change",
      "Cancel"
    );
    if (!confirmed) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    const Upload = async () => {
      try {
        const result = await uploadProfileImage(user?._id as string, file);
        if (result.success) {
          dispatch(
            updateUserField({
              key: "imageUrl",
              value: result.imageUrl,
            })
          );
          showSuccessToast(result.message);
        }
      } catch (error) {
        return;
      }
    };
    Upload();
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <ToastContainer />
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm">
          {/* Profile Header */}
          <div className="text-center pt-12 pb-6">
            {/* <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-200 to-orange-100 overflow-hidden">
              <img
                src={imageUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div> */}
            <div
              className="w-32 h-32 mx-auto mb-4 relative rounded-full overflow-hidden cursor-pointer"
              onClick={handleImageClick}
            >
              <img
                src={imagePreview || imageUrl || "/9440461.jpg"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>

            <h1 className="text-2xl font-semibold text-gray-900">{name}</h1>
            <button
              onClick={handleEditClick}
              className="mt-4 w-64 py-2 bg-pink-50 text-pink-900 rounded-md text-sm font-medium hover:bg-pink-100 transition"
            >
              Edit Profile
            </button>
          </div>

          {showOtpModal && (
            <OtpVerificationPage
              email={formData.email}
              onSubmit={verifyOtpApi}
              onResend={resendOtpApi}
              loading={isLoading}
            />
          )}

          {/* Contact Information */}
          <div className="px-8 py-6 border-t border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Contact Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <p className="text-gray-900 mt-1">{email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Phone Number</label>
                <p className="text-gray-900 mt-1">{phone}</p>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="px-8 py-6 border-t border-gray-100">
            {!user?.googleId && (
              <button
                onClick={handlePassChange}
                className="w-full flex items-center justify-between py-3 px-4 rounded-md hover:bg-gray-50 cursor-pointer transition"
              >
                <span className="text-gray-700">Change Password</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            )}
          </div>

          {/* Log Out Button */}
          <div className="px-8 py-6 border-t border-gray-100">
            <button
              onClick={() => {
                handleLogout({
                  dispatch,
                  navigate,
                  showConfirm,
                });
              }}
              className="px-6 py-2 bg-pink-50 text-pink-900 rounded-md text-sm font-medium hover:bg-pink-100 transition"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Edit Profile Modal */}
        <PasschangeModal
          isOpen={isPassModalOpen}
          onClose={() => {
            setIsPassModalOpen(false);
            setErrors({});
          }}
          formData={passFormData}
          errors={passErrors}
          onChange={handlePassInputChange}
          onSave={handlePasswordSave}
        />
        <UserModal
          isOpen={isEditModalOpen}
          title="Edit Profile"
          onClose={() => {
            setIsEditModalOpen(false);
            setErrors({});
          }}
          footer={
            <>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-pink-600 text-white rounded"
              >
                Save
              </button>
            </>
          }
        >
          <UserModal.Field label="Full Name" htmlFor="name">
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </UserModal.Field>

          <UserModal.Field label="Email" htmlFor="email">
            <input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </UserModal.Field>

          <UserModal.Field label="Phone" htmlFor="phone">
            <input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Phone"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </UserModal.Field>
        </UserModal>
      </div>
      <BottomNavBar
        defaultActive="profile"
        restaurantId={restaurantId}
        tableNo={tableNo}
      />
    </div>
  );
}
