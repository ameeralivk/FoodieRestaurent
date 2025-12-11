import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import ErrorPTag from "../../Elements/ErrorParagraph"; // Your existing component

interface FieldProps {
  name: string;
  label: string;
  type:
    | "text"
    | "number"
    | "image"
    | "features"
    | "select"
    | "duration"
    | "multi-select";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const isViewMode = mode === "view";

  useEffect(() => {
    if (isOpen) {
      const empty: any = {};
      fields.forEach((field) => {
        if (field.type !== "multi-select" && field.type !== "image") {
          empty[field.name] = field.value || "";
        }
      });
      setFormData(empty);

      setFeatures(fields.find((f) => f.type === "multi-select")?.value || []);
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
            .filter(
              (f) =>
                f.type !== "features" &&
                f.type !== "image" &&
                f.type !== "multi-select"
            )
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
        {/* {fields.some((f) => f.type === "features") && (
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
        )} */}
         <div className="mt-5">
         <span className="text-gray-400 text-sm mb-2 block">Features</span>
        {isViewMode ? (
          <ul className="list-disc list-inside space-y-2 bg-gray-800 p-3 rounded border border-gray-700">
            {features.map((feat, i) => (
              <li key={i}>{feat}</li>
            ))}
          </ul>
        ) : (
          
          <div className="bg-gray-800 border border-gray-700 rounded p-2">
            {/* 🔎 Search Box */}
            <input
              type="text"
              placeholder="Search features..."
              className="w-full mb-2 px-3 py-2 bg-gray-700 border border-gray-600 rounded outline-none"
              onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            />

            {/* List with tick marks */}
            <div className="max-h-40 overflow-y-auto">
              {fields
                .find((f) => f.type === "multi-select")
                ?.options?.filter((opt) =>
                  opt.toLowerCase().includes(searchTerm)
                ) // 👈 filter
                .map((opt) => {
                  const isSelected = features.includes(opt);

                  return (
                    <div
                      key={opt}
                      className="flex items-center justify-between cursor-pointer px-2 py-2 hover:bg-gray-700 rounded"
                      onClick={() => {
                        const updated = isSelected
                          ? features.filter((f) => f !== opt)
                          : [...features, opt];
                        setFeatures(updated);
                      }}
                    >
                      <span>{opt}</span>

                      {isSelected && (
                        <span className="text-green-400 font-bold">✔</span>
                      )}
                    </div>
                  );
                })}
            </div>
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
    </div>
  );
}
