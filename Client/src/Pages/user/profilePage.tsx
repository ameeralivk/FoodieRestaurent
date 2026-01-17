// // import React, { useState } from "react";
// // import { ChevronRight, X } from "lucide-react";
// // import UserModal from "../../Components/Elements/Reusable/userModal";
// // import { useSelector } from "react-redux";
// // import type { RootState } from "../../redux/store/store";
// // import {
// //   editProfile,
// //   passwordChange,
// //   uploadProfileImage,
// //   verifyOtp,
// // } from "../../services/profile";
// // import { useDispatch } from "react-redux";
// // import OtpVerificationPage from "../../Components/modals/user/otpVerification";
// // import { updateUser, updateUserField } from "../../redux/slice/userSlice";
// // import { showSuccessToast } from "../../Components/Elements/SuccessToast";
// // import { validateProfileForm } from "../../Validation/userProfileValidation";
// // import { ToastContainer } from "react-toastify";
// // import Navbar from "../../Components/Layouts/userLayouts/Navbar";
// // import BottomNavBar from "../../Components/user/DownBar";
// // import PasschangeModal from "../../Components/user/PasschangeModal";
// // import { Upload } from "lucide-react";
// // import { showConfirm } from "../../Components/Elements/ConfirmationSwall";
// // import { showErrorToast } from "../../Components/Elements/ErrorToast";
// // import { handleLogout } from "../../utils/logoutHandle";
// // import { useNavigate } from "react-router-dom";
// // interface ProfileFormErrors {
// //   name?: string;
// //   email?: string;
// //   phone?: string;
// // }

// // export default function UserProfile() {
// //   const dispatch = useDispatch();
// //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// //   const email = useSelector((state: RootState) => state.userAuth.user?.email);
// //   const [isPassModalOpen, setIsPassModalOpen] = useState(false);
// //   const imageUrl = useSelector(
// //     (state: RootState) => state.userAuth.user?.imageUrl
// //   );
// //   const [passFormData, setPassFormData] = useState({
// //     oldPassword: "",
// //     newPassword: "",
// //     confirmPassword: "",
// //   });

// //   const [passErrors, setPassErrors] = useState<{
// //     oldPassword?: string;
// //     newPassword?: string;
// //     confirmPassword?: string;
// //   }>({});

// //   const user = useSelector((state: RootState) => state.userAuth.user);
// //   const name = useSelector((state: RootState) => state.userAuth.user?.name);
// //   const phone = useSelector((state: RootState) => state.userAuth.user?.phone);
// //   const [imagePreview, setImagePreview] = useState<string | null>(null);
// //   const navigate = useNavigate();
// //   const fileInputRef = React.useRef<HTMLInputElement>(null);
// //   const restaurantId = useSelector(
// //     (state: RootState) => state.userAuth.user?.restaurantId
// //   );
// //   const tableNo = useSelector(
// //     (state: RootState) => state.userAuth.user?.tableNo
// //   );
// //   const [errors, setErrors] = useState<ProfileFormErrors>({});
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [showOtpModal, setShowOtpModal] = useState(false);
// //   async function verifyOtpApi(otp: string) {
// //     console.log(otp);
// //     try {
// //       const result = await verifyOtp(formData.email as string, otp);
// //       if (result.success) {
// //         dispatch(
// //           updateUser({
// //             name: formData.name,
// //             phone: formData.phone,
// //             email: formData.email,
// //           })
// //         );
// //         showSuccessToast(result.message);
// //       }
// //     } catch (error) {
// //       console.log(error, "err");
// //       return;
// //     }
// //     setShowOtpModal(false);
// //   }

// //   const handlePassChange = () => {
// //     setIsPassModalOpen(true);
// //   };

// //   const handlePassInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const { name, value } = e.target;
// //     setPassFormData((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //   };

// //   const handlePasswordSave = async () => {
// //     const errors: typeof passErrors = {};

// //     if (!passFormData.oldPassword) {
// //       errors.oldPassword = "Old password is required";
// //     }

// //     if (!passFormData.newPassword) {
// //       errors.newPassword = "New password is required";
// //     }

// //     if (passFormData.newPassword !== passFormData.confirmPassword) {
// //       errors.confirmPassword = "Passwords do not match";
// //     }

// //     if (Object.keys(errors).length > 0) {
// //       setPassErrors(errors);
// //       return;
// //     }

// //     try {
// //       const res = await passwordChange(
// //         user?._id as string,
// //         passFormData.oldPassword,
// //         passFormData.newPassword
// //       );
// //       console.log(res, "res");
// //       if (res.success) {
// //         showSuccessToast("Password updated successfully");
// //         setIsPassModalOpen(false);
// //         setPassFormData({
// //           oldPassword: "",
// //           newPassword: "",
// //           confirmPassword: "",
// //         });
// //         setPassErrors({});
// //       } else {
// //         showErrorToast(res.message);
// //       }
// //     } catch (err: any) {
// //       showErrorToast(err);
// //     }
// //   };

// //   async function resendOtpApi() {
// //     if (!user) return;
// //     const result = await editProfile(
// //       user._id,
// //       formData.name,
// //       formData.phone,
// //       formData.email
// //     );
// //     if (result.success) {
// //       showSuccessToast("otp resended Succcessfully");
// //     }
// //   }
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     phone: "",
// //   });

// //   const handleEditClick = () => {
// //     setFormData({
// //       name: name || "",
// //       phone: phone || "",
// //       email: email || "",
// //     });

// //     console.log(formData, "data");
// //     setIsEditModalOpen(true);
// //   };

// //   const handleSave = async () => {
// //     const { isValid, errors } = validateProfileForm(formData);

// //     if (!isValid) {
// //       setErrors(errors);
// //       return;
// //     }

// //     if (!user?._id) return;

// //     const result = await editProfile(
// //       user._id,
// //       formData.name,
// //       formData.phone,
// //       formData.email
// //     );

// //     if (result?.success) {
// //       if (result.requiresOtp) {
// //         setShowOtpModal(true);
// //         setIsEditModalOpen(false);
// //         return;
// //       }
// //       dispatch(
// //         updateUser({
// //           name: formData.name,
// //           phone: formData.phone,
// //           email: formData.email,
// //         })
// //       );
// //       showSuccessToast(result.message);
// //     }
// //     console.log(result, "result");
// //     setIsEditModalOpen(false);
// //   };

// //   const handleImageClick = () => {
// //     if (fileInputRef.current) {
// //       fileInputRef.current.click();
// //     }
// //   };

// //   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (!file) return;
// //     const confirmed = await showConfirm(
// //       "Change the Profile Image?",
// //       `Are you sure you want to change the profileImage?`,
// //       "Change",
// //       "Cancel"
// //     );
// //     if (!confirmed) return;
// //     const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

// //     if (!allowedTypes.includes(file.type)) {
// //       showErrorToast("Invalid file format! Only JPG, PNG, or WEBP allowed.");
// //       return;
// //     }

// //     const reader = new FileReader();
// //     reader.onloadend = () => {
// //       setImagePreview(reader.result as string);
// //     };
// //     reader.readAsDataURL(file);

// //     const Upload = async () => {
// //       try {
// //         const result = await uploadProfileImage(user?._id as string, file);
// //         if (result.success) {
// //           dispatch(
// //             updateUserField({
// //               key: "imageUrl",
// //               value: result.imageUrl,
// //             })
// //           );
// //           showSuccessToast(result.message);
// //         }
// //       } catch (error) {
// //         return;
// //       }
// //     };
// //     Upload();
// //   };

// //   const handleChange = (
// //     e: React.ChangeEvent<
// //       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
// //     >
// //   ) => {
// //     const { name, value } = e.target;

// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //   };

// //   return (
// //     <div>
// //       <Navbar />
// //       <ToastContainer />
// //       <div className="min-h-screen bg-gray-50 py-8 px-4">
// //         <ToastContainer />
// //         <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm">
// //           {/* Profile Header */}
// //           <div className="text-center pt-12 pb-6">
// //             {/* <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-200 to-orange-100 overflow-hidden">
// //               <img
// //                 src={imageUrl}
// //                 alt="Profile"
// //                 className="w-full h-full object-cover"
// //               />
// //             </div> */}
// //             <div
// //               className="w-32 h-32 mx-auto mb-4 relative rounded-full overflow-hidden cursor-pointer"
// //               onClick={handleImageClick}
// //             >
// //               <img
// //                 src={imagePreview || imageUrl || "/9440461.jpg"}
// //                 alt="Profile"
// //                 className="w-full h-full object-cover"
// //               />
// //               <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition">
// //                 <Upload className="w-8 h-8 text-white" />
// //               </div>
// //               <input
// //                 type="file"
// //                 accept="image/*"
// //                 className="hidden"
// //                 ref={fileInputRef}
// //                 onChange={handleFileChange}
// //               />
// //             </div>

// //             <h1 className="text-2xl font-semibold text-gray-900">{name}</h1>
// //             <button
// //               onClick={handleEditClick}
// //               className="mt-4 w-64 py-2 bg-pink-50 text-pink-900 rounded-md text-sm font-medium hover:bg-pink-100 transition"
// //             >
// //               Edit Profile
// //             </button>
// //           </div>

// //           {showOtpModal && (
// //             <OtpVerificationPage
// //               email={formData.email}
// //               onSubmit={verifyOtpApi}
// //               onResend={resendOtpApi}
// //               loading={isLoading}
// //             />
// //           )}

// //           {/* Contact Information */}
// //           <div className="px-8 py-6 border-t border-gray-100">
// //             <h2 className="text-lg font-semibold text-gray-900 mb-4">
// //               Contact Information
// //             </h2>
// //             <div className="space-y-4">
// //               <div>
// //                 <label className="text-sm text-gray-600">Email</label>
// //                 <p className="text-gray-900 mt-1">{email}</p>
// //               </div>
// //               <div>
// //                 <label className="text-sm text-gray-600">Phone Number</label>
// //                 <p className="text-gray-900 mt-1">{phone}</p>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Account Settings */}
// //           <div className="px-8 py-6 border-t border-gray-100">
// //             {!user?.googleId && (
// //               <button
// //                 onClick={handlePassChange}
// //                 className="w-full flex items-center justify-between py-3 px-4 rounded-md hover:bg-gray-50 cursor-pointer transition"
// //               >
// //                 <span className="text-gray-700">Change Password</span>
// //                 <ChevronRight className="w-5 h-5 text-gray-400" />
// //               </button>
// //             )}
// //           </div>

// //           {/* Log Out Button */}
// //           <div className="px-8 py-6 border-t border-gray-100">
// //             <button
// //               onClick={() => {
// //                 handleLogout({
// //                   dispatch,
// //                   navigate,
// //                   showConfirm,
// //                 });
// //               }}
// //               className="px-6 py-2 bg-pink-50 text-pink-900 rounded-md text-sm font-medium hover:bg-pink-100 transition"
// //             >
// //               Log Out
// //             </button>
// //           </div>
// //         </div>

// //         {/* Edit Profile Modal */}
// //         <PasschangeModal
// //           isOpen={isPassModalOpen}
// //           onClose={() => {
// //             setIsPassModalOpen(false);
// //             setErrors({});
// //           }}
// //           formData={passFormData}
// //           errors={passErrors}
// //           onChange={handlePassInputChange}
// //           onSave={handlePasswordSave}
// //         />
// //         <UserModal
// //           isOpen={isEditModalOpen}
// //           title="Edit Profile"
// //           onClose={() => {
// //             setIsEditModalOpen(false);
// //             setErrors({});
// //           }}
// //           footer={
// //             <>
// //               <button
// //                 onClick={() => setIsEditModalOpen(false)}
// //                 className="px-4 py-2 bg-gray-200 rounded"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 onClick={handleSave}
// //                 className="px-4 py-2 bg-pink-600 text-white rounded"
// //               >
// //                 Save
// //               </button>
// //             </>
// //           }
// //         >
// //           <UserModal.Field label="Full Name" htmlFor="name">
// //             <input
// //               id="name"
// //               name="name"
// //               value={formData.name}
// //               onChange={handleChange}
// //               className="w-full border p-2 rounded"
// //               placeholder="Name"
// //             />
// //             {errors.name && (
// //               <p className="text-red-500 text-sm mt-1">{errors.name}</p>
// //             )}
// //           </UserModal.Field>

// //           <UserModal.Field label="Email" htmlFor="email">
// //             <input
// //               id="email"
// //               name="email"
// //               value={formData.email}
// //               onChange={handleChange}
// //               className="w-full border p-2 rounded"
// //               placeholder="Email"
// //             />
// //             {errors.email && (
// //               <p className="text-red-500 text-sm mt-1">{errors.email}</p>
// //             )}
// //           </UserModal.Field>

// //           <UserModal.Field label="Phone" htmlFor="phone">
// //             <input
// //               id="phone"
// //               name="phone"
// //               value={formData.phone}
// //               onChange={handleChange}
// //               className="w-full border p-2 rounded"
// //               placeholder="Phone"
// //             />
// //             {errors.phone && (
// //               <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
// //             )}
// //           </UserModal.Field>
// //         </UserModal>
// //       </div>
// //       <BottomNavBar
// //         defaultActive="profile"
// //         restaurantId={restaurantId}
// //         tableNo={tableNo}
// //       />
// //     </div>
// //   );
// // }

// import React, { useState } from "react";
// import { ChevronRight, X } from "lucide-react";
// import UserModal from "../../Components/Elements/Reusable/userModal";
// import { useSelector } from "react-redux";
// import type { RootState } from "../../redux/store/store";
// import {
//   editProfile,
//   passwordChange,
//   uploadProfileImage,
//   verifyOtp,
// } from "../../services/profile";
// import { useDispatch } from "react-redux";
// import OtpVerificationPage from "../../Components/modals/user/otpVerification";
// import { updateUser, updateUserField } from "../../redux/slice/userSlice";
// import { showSuccessToast } from "../../Components/Elements/SuccessToast";
// import { validateProfileForm } from "../../Validation/userProfileValidation";
// import { ToastContainer } from "react-toastify";
// import Navbar from "../../Components/Layouts/userLayouts/Navbar";
// import BottomNavBar from "../../Components/user/DownBar";
// import PasschangeModal from "../../Components/user/PasschangeModal";
// import { Upload } from "lucide-react";
// import { showConfirm } from "../../Components/Elements/ConfirmationSwall";
// import { showErrorToast } from "../../Components/Elements/ErrorToast";
// import { handleLogout } from "../../utils/logoutHandle";
// import { useNavigate } from "react-router-dom";
// interface ProfileFormErrors {
//   name?: string;
//   email?: string;
//   phone?: string;
// }

// export default function UserProfile() {
//   const dispatch = useDispatch();
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const email = useSelector((state: RootState) => state.userAuth.user?.email);
//   const [isPassModalOpen, setIsPassModalOpen] = useState(false);
//   const imageUrl = useSelector(
//     (state: RootState) => state.userAuth.user?.imageUrl
//   );
//   const [passFormData, setPassFormData] = useState({
//     oldPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const [passErrors, setPassErrors] = useState<{
//     oldPassword?: string;
//     newPassword?: string;
//     confirmPassword?: string;
//   }>({});

//   const user = useSelector((state: RootState) => state.userAuth.user);
//   const name = useSelector((state: RootState) => state.userAuth.user?.name);
//   const phone = useSelector((state: RootState) => state.userAuth.user?.phone);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const navigate = useNavigate();
//   const fileInputRef = React.useRef<HTMLInputElement>(null);
//   const restaurantId = useSelector(
//     (state: RootState) => state.userAuth.user?.restaurantId
//   );
//   const tableNo = useSelector(
//     (state: RootState) => state.userAuth.user?.tableNo
//   );
//   const [errors, setErrors] = useState<ProfileFormErrors>({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [showOtpModal, setShowOtpModal] = useState(false);
//   async function verifyOtpApi(otp: string) {
//     console.log(otp);
//     try {
//       const result = await verifyOtp(formData.email as string, otp);
//       if (result.success) {
//         dispatch(
//           updateUser({
//             name: formData.name,
//             phone: formData.phone,
//             email: formData.email,
//           })
//         );
//         showSuccessToast(result.message);
//       }
//     } catch (error) {
//       console.log(error, "err");
//       return;
//     }
//     setShowOtpModal(false);
//   }

//   const handlePassChange = () => {
//     setIsPassModalOpen(true);
//   };

//   const handlePassInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setPassFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handlePasswordSave = async () => {
//     const errors: typeof passErrors = {};

//     if (!passFormData.oldPassword) {
//       errors.oldPassword = "Old password is required";
//     }

//     if (!passFormData.newPassword) {
//       errors.newPassword = "New password is required";
//     }

//     if (passFormData.newPassword !== passFormData.confirmPassword) {
//       errors.confirmPassword = "Passwords do not match";
//     }

//     if (Object.keys(errors).length > 0) {
//       setPassErrors(errors);
//       return;
//     }

//     try {
//       const res = await passwordChange(
//         user?._id as string,
//         passFormData.oldPassword,
//         passFormData.newPassword
//       );
//       console.log(res, "res");
//       if (res.success) {
//         showSuccessToast("Password updated successfully");
//         setIsPassModalOpen(false);
//         setPassFormData({
//           oldPassword: "",
//           newPassword: "",
//           confirmPassword: "",
//         });
//         setPassErrors({});
//       } else {
//         showErrorToast(res.message);
//       }
//     } catch (err: any) {
//       showErrorToast(err);
//     }
//   };

//   async function resendOtpApi() {
//     if (!user) return;
//     const result = await editProfile(
//       user._id,
//       formData.name,
//       formData.phone,
//       formData.email
//     );
//     if (result.success) {
//       showSuccessToast("otp resended Succcessfully");
//     }
//   }
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//   });

//   const handleEditClick = () => {
//     setFormData({
//       name: name || "",
//       phone: phone || "",
//       email: email || "",
//     });

//     console.log(formData, "data");
//     setIsEditModalOpen(true);
//   };

//   const handleSave = async () => {
//     const { isValid, errors } = validateProfileForm(formData);

//     if (!isValid) {
//       setErrors(errors);
//       return;
//     }

//     if (!user?._id) return;

//     const result = await editProfile(
//       user._id,
//       formData.name,
//       formData.phone,
//       formData.email
//     );

//     if (result?.success) {
//       if (result.requiresOtp) {
//         setShowOtpModal(true);
//         setIsEditModalOpen(false);
//         return;
//       }
//       dispatch(
//         updateUser({
//           name: formData.name,
//           phone: formData.phone,
//           email: formData.email,
//         })
//       );
//       showSuccessToast(result.message);
//     }
//     console.log(result, "result");
//     setIsEditModalOpen(false);
//   };

//   const handleImageClick = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const confirmed = await showConfirm(
//       "Change the Profile Image?",
//       `Are you sure you want to change the profileImage?`,
//       "Change",
//       "Cancel"
//     );
//     if (!confirmed) return;
//     const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

//     if (!allowedTypes.includes(file.type)) {
//       showErrorToast("Invalid file format! Only JPG, PNG, or WEBP allowed.");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setImagePreview(reader.result as string);
//     };
//     reader.readAsDataURL(file);

//     const Upload = async () => {
//       try {
//         const result = await uploadProfileImage(user?._id as string, file);
//         if (result.success) {
//           dispatch(
//             updateUserField({
//               key: "imageUrl",
//               value: result.imageUrl,
//             })
//           );
//           showSuccessToast(result.message);
//         }
//       } catch (error) {
//         return;
//       }
//     };
//     Upload();
//   };

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
//       <Navbar />
//       <ToastContainer />
//       <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="bg-white rounded-2xl shadow-lg border-2 border-orange-100">
//           {/* Profile Header */}
//           <div className="text-center pt-12 pb-8">
//             {/* <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-200 to-orange-100 overflow-hidden">
//               <img
//                 src={imageUrl}
//                 alt="Profile"
//                 className="w-full h-full object-cover"
//               />
//             </div> */}
//             <div
//               className="w-32 h-32 mx-auto mb-4 relative rounded-full overflow-hidden cursor-pointer"
//               onClick={handleImageClick}
//             >
//               <img
//                 src={imagePreview || imageUrl || "/9440461.jpg"}
//                 alt="Profile"
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition">
//                 <Upload className="w-8 h-8 text-white" />
//               </div>
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 ref={fileInputRef}
//                 onChange={handleFileChange}
//               />
//             </div>

//             <h1 className="text-3xl font-bold text-gray-900 mb-2">{name}</h1>
//             <p className="text-gray-600 mb-4">{email}</p>
//             <button
//               onClick={handleEditClick}
//               className="mt-4 px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl text-sm font-bold hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
//             >
//               Edit Profile
//             </button>
//           </div>

//           {showOtpModal && (
//             <OtpVerificationPage
//               email={formData.email}
//               onSubmit={verifyOtpApi}
//               onResend={resendOtpApi}
//               loading={isLoading}
//             />
//           )}

//           {/* Contact Information */}
//           <div className="px-8 py-6 border-t border-orange-100">
//             <h2 className="text-xl font-bold text-gray-900 mb-6">
//               Contact Information
//             </h2>
//             <div className="space-y-6">
//               <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-100">
//                 <label className="text-sm text-gray-600 font-semibold block mb-2">Email</label>
//                 <p className="text-gray-900 font-medium">{email}</p>
//               </div>
//               <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-100">
//                 <label className="text-sm text-gray-600 font-semibold block mb-2">Phone Number</label>
//                 <p className="text-gray-900 font-medium">{phone}</p>
//               </div>
//             </div>
//           </div>

//           {/* Account Settings */}
//           <div className="px-8 py-6 border-t border-orange-100">
//             {!user?.googleId && (
//               <button
//                 onClick={handlePassChange}
//                 className="w-full flex items-center justify-between py-4 px-5 rounded-xl bg-white border-2 border-orange-200 hover:bg-orange-50 hover:border-orange-300 cursor-pointer transition-all shadow-md hover:shadow-lg"
//               >
//                 <span className="text-gray-700 font-semibold">Change Password</span>
//                 <ChevronRight className="w-5 h-5 text-orange-600" />
//               </button>
//             )}
//           </div>

//           {/* Log Out Button */}
//           <div className="px-8 py-6 border-t border-orange-100 pb-8">
//             <button
//               onClick={() => {
//                 handleLogout({
//                   dispatch,
//                   navigate,
//                   showConfirm,
//                 });
//               }}
//               className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl text-sm font-bold hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
//             >
//               Log Out
//             </button>
//           </div>
//         </div>

//         {/* Edit Profile Modal */}
//         <PasschangeModal
//           isOpen={isPassModalOpen}
//           onClose={() => {
//             setIsPassModalOpen(false);
//             setErrors({});
//           }}
//           formData={passFormData}
//           errors={passErrors}
//           onChange={handlePassInputChange}
//           onSave={handlePasswordSave}
//         />
//         <UserModal
//           isOpen={isEditModalOpen}
//           title="Edit Profile"
//           onClose={() => {
//             setIsEditModalOpen(false);
//             setErrors({});
//           }}
//           footer={
//             <>
//               <button
//                 onClick={() => setIsEditModalOpen(false)}
//                 className="px-4 py-2 bg-gray-200 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSave}
//                 className="px-4 py-2 bg-pink-600 text-white rounded"
//               >
//                 Save
//               </button>
//             </>
//           }
//         >
//           <UserModal.Field label="Full Name" htmlFor="name">
//             <input
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//               placeholder="Name"
//             />
//             {errors.name && (
//               <p className="text-red-500 text-sm mt-1">{errors.name}</p>
//             )}
//           </UserModal.Field>

//           <UserModal.Field label="Email" htmlFor="email">
//             <input
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//               placeholder="Email"
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//             )}
//           </UserModal.Field>

//           <UserModal.Field label="Phone" htmlFor="phone">
//             <input
//               id="phone"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//               placeholder="Phone"
//             />
//             {errors.phone && (
//               <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
//             )}
//           </UserModal.Field>
//         </UserModal>
//       </div>
//       <BottomNavBar
//         defaultActive="profile"
//         restaurantId={restaurantId}
//         tableNo={tableNo}
//       />
//     </div>
//   );
// }


import React, { useState } from "react";
import { ChevronRight, Upload, LogOut, Lock, User, Mail, Phone, Edit2 } from "lucide-react";
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [showOtpModal, setShowOtpModal] = useState(false);

  async function verifyOtpApi(otp: string) {
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
      showSuccessToast("OTP resent successfully");
    }
  }

  const handleEditClick = () => {
    setFormData({
      name: name || "",
      phone: phone || "",
      email: email || "",
    });
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
      "Change Profile Picture",
      "Are you sure you want to change your profile picture?",
      "Update",
      "Cancel"
    );
    if (!confirmed) return;
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      showErrorToast("Invalid file format! Only JPG, PNG, or WEBP allowed.");
      return;
    }

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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 pb-24">
      <Navbar />
      <ToastContainer />
      <div className="max-w-xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-orange-100">

          {/* Header Background */}
          <div className="h-32 bg-gradient-to-r from-orange-400 to-amber-500 relative">
          </div>

          {/* Profile Header */}
          <div className="text-center px-6 -mt-16 pb-6 relative z-10">
            <div
              className="w-32 h-32 mx-auto mb-4 relative rounded-full overflow-hidden cursor-pointer border-4 border-white shadow-md group"
              onClick={handleImageClick}
            >
              <img
                src={imagePreview || imageUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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

            <h1 className="text-2xl font-bold text-gray-900 mb-1">{name}</h1>
            <p className="text-gray-500 text-sm mb-6">{email}</p>

            <button
              onClick={handleEditClick}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-orange-50 text-orange-700 rounded-xl text-sm font-bold hover:bg-orange-100 transition-all border border-orange-200"
            >
              <Edit2 className="w-4 h-4" />
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

          {/* Info Section */}
          <div className="px-6 py-2 space-y-1">
            <div className="p-4 flex items-center gap-4 hover:bg-gray-50 rounded-2xl transition-colors">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Email</p>
                <p className="text-gray-900 font-medium">{email}</p>
              </div>
            </div>

            <div className="p-4 flex items-center gap-4 hover:bg-gray-50 rounded-2xl transition-colors">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Phone</p>
                <p className="text-gray-900 font-medium">{phone}</p>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="px-6 py-4 space-y-3 border-t border-gray-100 mt-2">
            {!user?.googleId && (
              <button
                onClick={handlePassChange}
                className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 cursor-pointer transition-all border border-transparent hover:border-gray-200 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                    <Lock className="w-5 h-5" />
                  </div>
                  <span className="text-gray-700 font-semibold">Change Password</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500" />
              </button>
            )}

            <button
              onClick={() => {
                handleLogout({
                  dispatch,
                  navigate,
                  showConfirm,
                });
              }}
              className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-red-50 cursor-pointer transition-all border border-transparent hover:border-red-100 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
                  <LogOut className="w-5 h-5" />
                </div>
                <span className="text-gray-700 font-semibold group-hover:text-red-600">Log Out</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
            </button>
          </div>
        </div>

        {/* Modals */}
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
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
              >
                Save Changes
              </button>
            </>
          }
        >
          <div className="space-y-4">
            <UserModal.Field label="Full Name" htmlFor="name">
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                placeholder="Your Name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.name}</p>
              )}
            </UserModal.Field>

            <UserModal.Field label="Email Address" htmlFor="email">
              <input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                placeholder="name@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.email}</p>
              )}
            </UserModal.Field>

            <UserModal.Field label="Phone Number" htmlFor="phone">
              <input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                placeholder="+91"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.phone}</p>
              )}
            </UserModal.Field>
          </div>
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

