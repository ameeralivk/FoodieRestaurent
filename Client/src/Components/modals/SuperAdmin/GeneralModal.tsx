// // import { useState, useEffect } from "react";
// // import type{ SubscriptionPlan } from "../../../types/SuperAdmin";
// // interface FieldProps {
// //   name: string;
// //   label: string;
// //   type: string;
// // }

// // interface ModalProps {
// //   isOpen: boolean;
// //   onClose: () => void;
// //   onSubmit: (data: any) => void;
// //   fields: FieldProps[];
// //   title?: string;
// //   submitText?: string;
// //   cancelText?: string;
// // }

// // export default function SubscriptionModal({
// //   isOpen,
// //   onClose,
// //   onSubmit,
// //   fields,
// //   title = "Modal Title",
// //   submitText = "Submit",
// //   cancelText = "Cancel",
// // }: ModalProps) {
// //   const [formData, setFormData] = useState<any>({});
// //   const [featureInput, setFeatureInput] = useState("");
// //   const [features, setFeatures] = useState<string[]>([]);

// //   const hasFeatureField = fields.some((field) => field.name === "features");

// //   useEffect(() => {
// //     if (isOpen) {
// //       const empty: any = {};
// //       fields.forEach((field) => {
// //         if (field.name !== "features") {
// //           empty[field.name] = "";
// //         }
// //       });

// //       setFormData(empty);
// //       setFeatures([]);
// //       setFeatureInput("");
// //     }
// //   }, [isOpen, fields]);

// //   const handleChange = (e: any) => {
// //     setFormData((prev: any) => ({
// //       ...prev,
// //       [e.target.name]: e.target.value,
// //     }));
// //   };

// //   const handleAddFeature = () => {
// //     if (!featureInput.trim()) return;
// //     setFeatures((prev) => [...prev, featureInput.trim()]);
// //     setFeatureInput("");
// //   };

// //   const removeFeature = (index: number) => {
// //     setFeatures((prev) => prev.filter((_, i) => i !== index));
// //   };

// //   const handleSubmit = () => {
// //     const finalData:SubscriptionPlan  = {
// //       ...formData,
// //     };

// //     if (hasFeatureField) {
// //       finalData.features = features;
// //     }

// //     onSubmit(finalData);
// //     onClose();
// //   };

// //   if (!isOpen) return null;

// //   return (
// //     <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
// //       <div className="bg-gray-800 text-white p-6 rounded-lg w-full max-w-lg shadow-xl pointer-events-auto max-h-[90vh] overflow-y-auto">
// //         <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>

// //         {/* Render all fields except 'features' */}
// //         <div className="space-y-4">
// //           {fields
// //             .filter((field) => field.name !== "features")
// //             .map((field) => (
// //               <div key={field.name}>
// //                 <label className="block text-sm font-medium mb-1">
// //                   {field.label}
// //                 </label>
// //                 <input
// //                   type={field.type}
// //                   name={field.name}
// //                   value={formData[field.name] || ""}
// //                   onChange={handleChange}
// //                   className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:ring-2 focus:ring-amber-500 outline-none"
// //                 />
// //               </div>
// //             ))}
// //         </div>

// //         {/* Conditionally render Feature section */}
// //         {hasFeatureField && (
// //           <>
// //             <h3 className="text-lg mt-5 font-semibold">Features</h3>

// //             <div className="flex gap-2">
// //               <input
// //                 type="text"
// //                 value={featureInput}
// //                 onChange={(e) => setFeatureInput(e.target.value)}
// //                 placeholder="Enter a feature"
// //                 className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded outline-none"
// //               />
// //               <button
// //                 onClick={handleAddFeature}
// //                 className="px-3 py-2 bg-amber-600 hover:bg-amber-700 rounded"
// //               >
// //                 Add
// //               </button>
// //             </div>

// //             {features.length > 0 && (
// //               <ul className="mt-3 space-y-2">
// //                 {features.map((feat, i) => (
// //                   <li
// //                     key={i}
// //                     className="flex justify-between bg-gray-700 px-3 py-2 rounded"
// //                   >
// //                     {feat}
// //                     <button
// //                       onClick={() => removeFeature(i)}
// //                       className="text-red-400 hover:text-red-600"
// //                     >
// //                       ❌
// //                     </button>
// //                   </li>
// //                 ))}
// //               </ul>
// //             )}
// //           </>
// //         )}

// //         <div className="flex justify-end gap-3 mt-6">
// //           <button
// //             onClick={onClose}
// //             className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500"
// //           >
// //             {cancelText}
// //           </button>
// //           <button
// //             onClick={handleSubmit}
// //             className="px-4 py-2 rounded bg-amber-600 hover:bg-amber-700"
// //           >
// //             {submitText}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // import { useState, useEffect } from "react";

// // interface FieldProps {
// //   name: string;
// //   label: string;
// //   type: string;
// //   value?: any;
// // }

// // interface ModalProps {
// //   isOpen: boolean;
// //   onClose: () => void;
// //   onSubmit?: (data: any) => void;
// //   fields: FieldProps[];
// //   title?: string;
// //   submitText?: string;
// //   cancelText?: string;
// //   mode?: "edit" | "view";
// // }

// // export default function SubscriptionModal({
// //   isOpen,
// //   onClose,
// //   onSubmit,
// //   fields,
// //   title = "Modal Title",
// //   submitText = "Submit",
// //   cancelText = "Close",
// //   mode = "edit",
// // }: ModalProps) {
// //   const [formData, setFormData] = useState<any>({});
// //   const [featureInput, setFeatureInput] = useState("");
// //   const [features, setFeatures] = useState<string[]>([]);

// //   const isViewMode = mode === "view";
// //   const hasFeatureField = fields.some((field) => field.name === "features");

// //   useEffect(() => {
// //     if (isOpen) {
// //       const empty: any = {};
// //       fields.forEach((field) => {
// //         if (field.name !== "features") {
// //           empty[field.name] = field.value || "";
// //         }
// //       });
// //       setFormData(empty);
// //       setFeatures(
// //         hasFeatureField
// //           ? (fields.find((f) => f.name === "features")?.value as string[]) || []
// //           : []
// //       );
// //       setFeatureInput("");
// //     }
// //   }, [isOpen, fields]);

// //   const handleChange = (e: any) => {
// //     setFormData((prev: any) => ({
// //       ...prev,
// //       [e.target.name]: e.target.value,
// //     }));
// //   };

// //   const handleAddFeature = () => {
// //     if (!featureInput.trim()) return;
// //     setFeatures((prev) => [...prev, featureInput.trim()]);
// //     setFeatureInput("");
// //   };

// //   const removeFeature = (index: number) => {
// //     setFeatures((prev) => prev.filter((_, i) => i !== index));
// //   };

// //   const handleSubmit = () => {
// //     if (onSubmit) {
// //       const finalData = { ...formData, features: hasFeatureField ? features : undefined };
// //       onSubmit(finalData);
// //     }
// //     onClose();
// //   };

// //   if (!isOpen) return null;

// //   return (
// //     <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 pointer-events-auto">
// //       <div className="bg-gray-900 text-white p-6 rounded-lg w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
// //         <h2 className="text-2xl font-bold mb-6 text-center border-b border-gray-700 pb-3">
// //           {title}
// //         </h2>

// //         {/* Fields */}
// //         <div className="space-y-4">
// //           {fields
// //             .filter((field) => field.name !== "features")
// //             .map((field) => (
// //               <div key={field.name} className="flex flex-col">
// //                 <span className="text-gray-400 text-sm mb-1">{field.label}</span>
// //                 {isViewMode ? (
// //                   <div className="bg-gray-800 px-3 py-2 rounded border border-gray-700">
// //                     {formData[field.name]}
// //                   </div>
// //                 ) : (
// //                   <input
// //                     type={field.type}
// //                     name={field.name}
// //                     value={formData[field.name] || ""}
// //                     onChange={handleChange}
// //                     className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:ring-2 focus:ring-amber-500 outline-none"
// //                   />
// //                 )}
// //               </div>
// //             ))}
// //         </div>

// //         {/* Features */}
// //         {hasFeatureField && (
// //           <div className="mt-5">
// //             <span className="text-gray-400 text-sm mb-2 block">Features</span>
// //             {isViewMode ? (
// //               <ul className="list-disc list-inside space-y-2 bg-gray-800 p-3 rounded border border-gray-700">
// //                 {features.map((feat, i) => (
// //                   <li key={i}>{feat}</li>
// //                 ))}
// //               </ul>
// //             ) : (
// //               <>
// //                 <div className="flex gap-2 mb-2">
// //                   <input
// //                     type="text"
// //                     value={featureInput}
// //                     onChange={(e) => setFeatureInput(e.target.value)}
// //                     placeholder="Enter a feature"
// //                     className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded outline-none"
// //                   />
// //                   <button
// //                     onClick={handleAddFeature}
// //                     className="px-3 py-2 bg-amber-600 hover:bg-amber-700 rounded"
// //                   >
// //                     Add
// //                   </button>
// //                 </div>
// //                 {features.length > 0 && (
// //                   <ul className="space-y-2">
// //                     {features.map((feat, i) => (
// //                       <li
// //                         key={i}
// //                         className="flex justify-between bg-gray-700 px-3 py-2 rounded border border-gray-600"
// //                       >
// //                         {feat}
// //                         <button
// //                           onClick={() => removeFeature(i)}
// //                           className="text-red-400 hover:text-red-600"
// //                         >
// //                           ❌
// //                         </button>
// //                       </li>
// //                     ))}
// //                   </ul>
// //                 )}
// //               </>
// //             )}
// //           </div>
// //         )}

// //         {/* Footer */}
// //         <div className="flex justify-end gap-3 mt-6 border-t border-gray-700 pt-3">
// //           <button
// //             onClick={onClose}
// //             className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500"
// //           >
// //             {cancelText}
// //           </button>
// //           {!isViewMode && (
// //             <button
// //               onClick={handleSubmit}
// //               className="px-4 py-2 rounded bg-amber-600 hover:bg-amber-700"
// //             >
// //               {submitText}
// //             </button>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import { useState, useEffect} from "react";
// import type{ ChangeEvent } from "react";

// interface FieldProps {
//   name: string;
//   label: string;
//   type: "text" | "number" | "image" | "features" | "select";
//   value?: any;
//   options?: string[]; // for select dropdown
// }

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit?: (data: any) => void;
//   fields: FieldProps[];
//   title?: string;
//   submitText?: string;
//   cancelText?: string;
//   mode?: "edit" | "view" | "add";
// }

// export default function SubscriptionModal({
//   isOpen,
//   onClose,
//   onSubmit,
//   fields,
//   title = "Modal Title",
//   submitText = "Submit",
//   cancelText = "Close",
//   mode = "edit",
// }: ModalProps) {
//   const [formData, setFormData] = useState<any>({});
//   const [featureInput, setFeatureInput] = useState("");
//   const [features, setFeatures] = useState<string[]>([]);
//   const [images, setImages] = useState<File[]>([]);
//   const [imagePreviews, setImagePreviews] = useState<string[]>([]);

//   const isViewMode = mode === "view";
//   const hasFeatureField = fields.some((field) => field.type === "features");
//   const hasImageField = fields.some((field) => field.type === "image");

//   useEffect(() => {
//     if (isOpen) {
//       const empty: any = {};
//       fields.forEach((field) => {
//         if (field.type !== "features" && field.type !== "image") {
//           empty[field.name] = field.value || "";
//         }
//       });
//       setFormData(empty);

//       setFeatures(
//         hasFeatureField
//           ? (fields.find((f) => f.type === "features")?.value as string[]) || []
//           : []
//       );

//       setImagePreviews(
//         hasImageField
//           ? (fields.find((f) => f.type === "image")?.value as string[]) || []
//           : []
//       );

//       setImages([]);
//       setFeatureInput("");
//     }
//   }, [isOpen, fields]);

//   const handleChange = (e: any) => {
//     setFormData((prev: any) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const file = e.target.files[0];
//       setImages([file]);
//       const reader = new FileReader();
//       reader.onload = () => {
//         if (reader.result) setImagePreviews([reader.result as string]);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleAddFeature = () => {
//     if (!featureInput.trim()) return;
//     setFeatures((prev) => [...prev, featureInput.trim()]);
//     setFeatureInput("");
//   };

//   const removeFeature = (index: number) => {
//     setFeatures((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleSubmit = () => {
//     if (onSubmit) {
//       const finalData = {
//         ...formData,
//         features: hasFeatureField ? features : undefined,
//         images: hasImageField ? images : undefined,
//       };
//       onSubmit(finalData);
//     }
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 pointer-events-auto">
//       <div className="bg-gray-900 text-white p-6 rounded-lg w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
//         <h2 className="text-2xl font-bold mb-6 text-center border-b border-gray-700 pb-3">
//           {title}
//         </h2>

//         <div className="space-y-4">
//           {fields
//             .filter(
//               (field) => field.type !== "features" && field.type !== "image"
//             )
//             .map((field) => (
//               <div key={field.name} className="flex flex-col">
//                 <span className="text-gray-400 text-sm mb-1">
//                   {field.label}
//                 </span>

//                 {field.type === "select" ? (
//                   isViewMode ? (
//                     <div className="bg-gray-800 px-3 py-2 rounded border border-gray-700">
//                       {formData[field.name]}
//                     </div>
//                   ) : (
//                     <select
//                       name={field.name}
//                       value={formData[field.name] || ""}
//                       onChange={handleChange}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:ring-2 focus:ring-amber-500 outline-none"
//                     >
//                       <option value="">Select {field.label}</option>
//                       {field.options?.map((opt, i) => (
//                         <option key={i} value={opt}>
//                           {opt}
//                         </option>
//                       ))}
//                     </select>
//                   )
//                 ) : isViewMode ? (
//                   <div className="bg-gray-800 px-3 py-2 rounded border border-gray-700">
//                     {formData[field.name]}
//                   </div>
//                 ) : (
//                   <input
//                     type={field.type}
//                     name={field.name}
//                     value={formData[field.name] || ""}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:ring-2 focus:ring-amber-500 outline-none"
//                   />
//                 )}
//               </div>
//             ))}
//         </div>

//         {/* Image Field */}
//         {hasImageField && (
//           <div className="mt-5">
//             <span className="text-gray-400 text-sm mb-2 block">Images</span>
//             <div className="flex gap-2 flex-wrap">
//               {imagePreviews.map((src, i) => (
//                 <div key={i} className="relative">
//                   <img
//                     src={src}
//                     alt={`preview-${i}`}
//                     className={`w-24 h-24 object-cover rounded cursor-pointer border border-gray-600 ${
//                       !isViewMode ? "hover:opacity-80" : ""
//                     }`}
//                     onClick={() => {
//                       if (!isViewMode)
//                         document.getElementById("imageInput")?.click();
//                     }}
//                   />
//                 </div>
//               ))}
//               {!isViewMode && (
//                 <input
//                   type="file"
//                   id="imageInput"
//                   className="hidden"
//                   onChange={handleImageChange}
//                 />
//               )}
//             </div>
//           </div>
//         )}

//         {/* Features */}
//         {hasFeatureField && (
//           <div className="mt-5">
//             <span className="text-gray-400 text-sm mb-2 block">Features</span>
//             {isViewMode ? (
//               <ul className="list-disc list-inside space-y-2 bg-gray-800 p-3 rounded border border-gray-700">
//                 {features.map((feat, i) => (
//                   <li key={i}>{feat}</li>
//                 ))}
//               </ul>
//             ) : (
//               <>
//                 <div className="flex gap-2 mb-2">
//                   <input
//                     type="text"
//                     value={featureInput}
//                     onChange={(e) => setFeatureInput(e.target.value)}
//                     placeholder="Enter a feature"
//                     className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded outline-none"
//                   />
//                   <button
//                     onClick={handleAddFeature}
//                     className="px-3 py-2 bg-amber-600 hover:bg-amber-700 rounded"
//                   >
//                     Add
//                   </button>
//                 </div>
//                 {features.length > 0 && (
//                   <ul className="space-y-2">
//                     {features.map((feat, i) => (
//                       <li
//                         key={i}
//                         className="flex justify-between bg-gray-700 px-3 py-2 rounded border border-gray-600"
//                       >
//                         {feat}
//                         <button
//                           onClick={() => removeFeature(i)}
//                           className="text-red-400 hover:text-red-600"
//                         >
//                           ❌
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </>
//             )}
//           </div>
//         )}

//         {/* Footer */}
//         <div className="flex justify-end gap-3 mt-6 border-t border-gray-700 pt-3">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500"
//           >
//             {cancelText}
//           </button>
//           {!isViewMode && (
//             <button
//               onClick={handleSubmit}
//               className="px-4 py-2 rounded bg-amber-600 hover:bg-amber-700"
//             >
//               {submitText}
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import type { ChangeEvent } from "react";

// interface FieldProps {
//   name: string;
//   label: string;
//   type: "text" | "number" | "image" | "features" | "select" | "duration";
//   value?: any;
//   options?: string[];
// }

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit?: (data: any) => void;
//   fields: FieldProps[];
//   title?: string;
//   submitText?: string;
//   cancelText?: string;
//   mode?: "add" | "edit" | "view";
// }

// export default function SubscriptionModal({
//   isOpen,
//   onClose,
//   onSubmit,
//   fields,
//   title = "Modal Title",
//   submitText = "Submit",
//   cancelText = "Close",
//   mode = "edit",
// }: ModalProps) {
//   const [formData, setFormData] = useState<any>({});
//   const [featureInput, setFeatureInput] = useState("");
//   const [features, setFeatures] = useState<string[]>([]);
//   const [images, setImages] = useState<File[]>([]);
//   const [imagePreviews, setImagePreviews] = useState<string[]>([]);

//   const isViewMode = mode === "view";

//   useEffect(() => {
//     if (isOpen) {
//       const empty: any = {};
//       fields.forEach((field) => {
//         if (field.type !== "features" && field.type !== "image") {
//           empty[field.name] = field.value || "";
//         }
//       });
//       setFormData(empty);

//       setFeatures(
//         fields.find((f) => f.type === "features")?.value || []
//       );
//       setImagePreviews(
//         fields.find((f) => f.type === "image")?.value || []
//       );
//       setImages([]);
//       setFeatureInput("");
//     }
//   }, [isOpen, fields]);

//   const handleChange = (e: any) => {
//     setFormData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const file = e.target.files[0];
//       setImages([file]);
//       const reader = new FileReader();
//       reader.onload = () => {
//         if (reader.result) setImagePreviews([reader.result as string]);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleAddFeature = () => {
//     if (!featureInput.trim()) return;
//     setFeatures((prev) => [...prev, featureInput.trim()]);
//     setFeatureInput("");
//   };

//   const removeFeature = (index: number) => {
//     setFeatures((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleSubmit = () => {
//     if (onSubmit) {
//       const finalData = {
//         ...formData,
//         features,
//         images,
//       };
//       onSubmit(finalData);
//     }
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
//       <div className="bg-gray-900 text-white p-6 rounded-lg w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
//         <h2 className="text-2xl font-bold mb-6 text-center border-b border-gray-700 pb-3">
//           {title}
//         </h2>

//         <div className="space-y-4">
//           {fields
//             .filter((f) => f.type !== "features" && f.type !== "image")
//             .map((field) => (
//               <div key={field.name} className="flex flex-col">
//                 <span className="text-gray-400 text-sm mb-1">{field.label}</span>

//                 {field.type === "duration" ? (
//                   isViewMode ? (
//                     <div className="bg-gray-800 px-3 py-2 rounded border border-gray-700">
//                       {formData[field.name]}
//                     </div>
//                   ) : (
//                     <>
//                       <div className="flex gap-2">
//                         <select
//                           name={field.name}
//                           value={formData[field.name] || ""}
//                           onChange={handleChange}
//                           className="w-1/2 px-3 py-2 bg-gray-700 border border-gray-600 rounded"
//                         >
//                           <option value="">Select Unit</option>
//                           {field.options?.map((opt, i) => (
//                             <option key={i} value={opt}>
//                               {opt}
//                             </option>
//                           ))}
//                         </select>
//                         <input
//                           type="number"
//                           name={field.name}
//                           value={formData[field.name] || ""}
//                           placeholder="Enter number"
//                           onChange={handleChange}
//                           className="w-1/2 px-3 py-2 bg-gray-700 border border-gray-600 rounded"
//                         />
//                       </div>
//                     </>
//                   )
//                 ) : field.type === "select" ? (
//                   isViewMode ? (
//                     <div className="bg-gray-800 px-3 py-2 rounded border border-gray-700">
//                       {formData[field.name]}
//                     </div>
//                   ) : (
//                     <select
//                       name={field.name}
//                       value={formData[field.name] || ""}
//                       onChange={handleChange}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
//                     >
//                       <option value="">Select {field.label}</option>
//                       {field.options?.map((opt, i) => (
//                         <option key={i} value={opt}>
//                           {opt}
//                         </option>
//                       ))}
//                     </select>
//                   )
//                 ) : isViewMode ? (
//                   <div className="bg-gray-800 px-3 py-2 rounded border border-gray-700">
//                     {formData[field.name]}
//                   </div>
//                 ) : (
//                   <input
//                     type={field.type}
//                     name={field.name}
//                     value={formData[field.name] || ""}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
//                   />
//                 )}
//               </div>
//             ))}
//         </div>

//         {/* Image */}
//         {fields.some((f) => f.type === "image") && (
//           <div className="mt-5">
//             <span className="text-gray-400 text-sm mb-2 block">Images</span>
//             <div className="flex gap-2 flex-wrap">
//               {imagePreviews.map((src, i) => (
//                 <img
//                   key={i}
//                   src={src}
//                   alt={`preview-${i}`}
//                   className={`w-24 h-24 object-cover rounded border border-gray-600 ${
//                     !isViewMode ? "cursor-pointer hover:opacity-80" : ""
//                   }`}
//                   onClick={() => !isViewMode && document.getElementById("imageInput")?.click()}
//                 />
//               ))}
//               {!isViewMode && (
//                 <input type="file" id="imageInput" className="hidden" onChange={handleImageChange} />
//               )}
//             </div>
//           </div>
//         )}

//         {/* Features */}
//         {fields.some((f) => f.type === "features") && (
//           <div className="mt-5">
//             <span className="text-gray-400 text-sm mb-2 block">Features</span>
//             {isViewMode ? (
//               <ul className="list-disc list-inside space-y-2 bg-gray-800 p-3 rounded border border-gray-700">
//                 {features.map((feat, i) => (
//                   <li key={i}>{feat}</li>
//                 ))}
//               </ul>
//             ) : (
//               <>
//                 <div className="flex gap-2 mb-2">
//                   <input
//                     type="text"
//                     value={featureInput}
//                     onChange={(e) => setFeatureInput(e.target.value)}
//                     placeholder="Enter a feature"
//                     className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
//                   />
//                   <button onClick={handleAddFeature} className="px-3 py-2 bg-amber-600 rounded hover:bg-amber-700">
//                     Add
//                   </button>
//                 </div>
//                 <ul className="space-y-2">
//                   {features.map((feat, i) => (
//                     <li key={i} className="flex justify-between bg-gray-700 px-3 py-2 rounded border border-gray-600">
//                       {feat}
//                       <button onClick={() => removeFeature(i)} className="text-red-400 hover:text-red-600">
//                         ❌
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               </>
//             )}
//           </div>
//         )}

//         {/* Footer */}
//         <div className="flex justify-end gap-3 mt-6 border-t border-gray-700 pt-3">
//           <button onClick={onClose} className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500">
//             {cancelText}
//           </button>
//           {!isViewMode && (
//             <button onClick={handleSubmit} className="px-4 py-2 rounded bg-amber-600 hover:bg-amber-700">
//               {submitText}
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import ErrorPTag from "../../Elements/ErrorParagraph"; // Your existing component

interface FieldProps {
  name: string;
  label: string;
  type: "text" | "number" | "image" | "features" | "select" | "duration";
  value?: any;
  options?: string[];
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: any) => void;
  fields: FieldProps[];
  title?: string;
  submitText?: string;
  cancelText?: string;
  mode?: "add" | "edit" | "view";
  externalErrors?: { [key: string]: string }; // NEW: errors passed from parent
  onFieldChange?: (name: string, value: any) => void;
}

export default function SubscriptionModal({
  isOpen,
  onClose,
  onSubmit,
  fields,
  title = "Modal Title",
  submitText = "Submit",
  cancelText = "Close",
  mode = "edit",
  externalErrors = {},
  onFieldChange,
}: ModalProps) {
  const [formData, setFormData] = useState<any>({});
  const [featureInput, setFeatureInput] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const isViewMode = mode === "view";

  useEffect(() => {
    if (isOpen) {
      const empty: any = {};
      fields.forEach((field) => {
        if (field.type !== "features" && field.type !== "image") {
          empty[field.name] = field.value || "";
        }
      });
      setFormData(empty);

      setFeatures(fields.find((f) => f.type === "features")?.value || []);
      setImagePreviews(fields.find((f) => f.type === "image")?.value || []);
      setImages([]);
      setFeatureInput("");
    }
  }, [isOpen]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prev: any) => ({ ...prev, [name]: value }));

    if (onFieldChange) onFieldChange(name, value); // <-- LIVE VALIDATION
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setImages([file]);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) setImagePreviews([reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddFeature = () => {
    if (!featureInput.trim()) return;
    setFeatures((prev) => [...prev, featureInput.trim()]);
    setFeatureInput("");
  };

  const removeFeature = (index: number) => {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (onSubmit) {
      // Convert number-like fields from string to number
      const finalData = { ...formData };

      Object.keys(finalData).forEach((key) => {
        const value = finalData[key];

        if (value !== "" && !isNaN(Number(value))) {
          finalData[key] = Number(value);
        }
      });

      finalData.features = features;
      finalData.images = images;

      onSubmit(finalData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-gray-900 text-white p-6 rounded-lg w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-center border-b border-gray-700 pb-3">
          {title}
        </h2>

        <div className="space-y-4">
          {fields
            .filter((f) => f.type !== "features" && f.type !== "image")
            .map((field) => (
              <div key={field.name} className="flex flex-col">
                <span className="text-gray-400 text-sm mb-1">
                  {field.label}
                </span>

                {field.type === "duration" ? (
                  isViewMode ? (
                    <div className="bg-gray-800 px-3 py-2 rounded border border-gray-700">
                      {formData[field.name]}
                    </div>
                  ) : (
                    <>
                      <div className="flex gap-2">
                        <select
                          name={field.name}
                          value={formData[field.name] || ""}
                          onChange={handleChange}
                          className="w-1/2 px-3 py-2 bg-gray-700 border border-gray-600 rounded"
                        >
                          <option value="">Select Unit</option>
                          {field.options?.map((opt, i) => (
                            <option key={i} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        <input
                          type="number"
                          name={field.name}
                          value={formData[field.name] || ""}
                          placeholder="Enter number"
                          onChange={handleChange}
                          className="w-1/2 px-3 py-2 bg-gray-700 border border-gray-600 rounded"
                        />
                      </div>
                      {externalErrors[field.name] && (
                        <ErrorPTag Text={externalErrors[field.name]} />
                      )}
                    </>
                  )
                ) : field.type === "select" ? (
                  isViewMode ? (
                    <div className="bg-gray-800 px-3 py-2 rounded border border-gray-700">
                      {formData[field.name]}
                    </div>
                  ) : (
                    <>
                      <select
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
                      >
                        <option value="">Select {field.label}</option>
                        {field.options?.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {externalErrors[field.name] && (
                        <ErrorPTag Text={externalErrors[field.name]} />
                      )}
                    </>
                  )
                ) : isViewMode ? (
                  <div className="bg-gray-800 px-3 py-2 rounded border border-gray-700">
                    {formData[field.name]}
                  </div>
                ) : (
                  <>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
                    />
                    {externalErrors[field.name] && (
                      <ErrorPTag Text={externalErrors[field.name]} />
                    )}
                  </>
                )}
              </div>
            ))}
        </div>

        {/* Image */}
        {fields.some((f) => f.type === "image") && (
          <div className="mt-5">
            <span className="text-gray-400 text-sm mb-2 block">Images</span>
            <div className="flex gap-2 flex-wrap">
              {imagePreviews.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`preview-${i}`}
                  className={`w-24 h-24 object-cover rounded border border-gray-600 ${
                    !isViewMode ? "cursor-pointer hover:opacity-80" : ""
                  }`}
                  onClick={() =>
                    !isViewMode &&
                    document.getElementById("imageInput")?.click()
                  }
                />
              ))}
              {!isViewMode && (
                <input
                  type="file"
                  id="imageInput"
                  className="hidden"
                  onChange={handleImageChange}
                />
              )}
              {externalErrors.images && (
                <ErrorPTag Text={externalErrors.images} />
              )}
            </div>
          </div>
        )}

        {/* Features */}
        {fields.some((f) => f.type === "features") && (
          <div className="mt-5">
            <span className="text-gray-400 text-sm mb-2 block">Features</span>
            {isViewMode ? (
              <ul className="list-disc list-inside space-y-2 bg-gray-800 p-3 rounded border border-gray-700">
                {features.map((feat, i) => (
                  <li key={i}>{feat}</li>
                ))}
              </ul>
            ) : (
              <>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    placeholder="Enter a feature"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
                  />
                  <button
                    onClick={handleAddFeature}
                    className="px-3 py-2 bg-amber-600 rounded hover:bg-amber-700"
                  >
                    Add
                  </button>
                </div>
                {externalErrors.features && (
                  <ErrorPTag Text={externalErrors.features} />
                )}
                <ul className="space-y-2">
                  {features.map((feat, i) => (
                    <li
                      key={i}
                      className="flex justify-between bg-gray-700 px-3 py-2 rounded border border-gray-600"
                    >
                      {feat}
                      <button
                        onClick={() => removeFeature(i)}
                        className="text-red-400 hover:text-red-600"
                      >
                        ❌
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6 border-t border-gray-700 pt-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500"
          >
            {cancelText}
          </button>
          {!isViewMode && (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded bg-amber-600 hover:bg-amber-700"
            >
              {submitText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
