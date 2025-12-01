import React, { useState } from "react";
import { X, AlertCircle, Upload } from "lucide-react";
interface RejectionModalProps {
  isOpen: boolean;
  // onClose: () => void;
  rejectionReason: string;
  documentType: "proof" | "photo";
  onReupload: (file: File) => void;
}

const RejectionModal: React.FC<RejectionModalProps> = ({
  isOpen,
  //   onClose,
  rejectionReason,
  documentType,
  onReupload,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onReupload(selectedFile);
      setSelectedFile(null);
      //   onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center 
     bg-black/20 backdrop-blur-sm"
    >
      <div className="bg-[#2a3f5f] rounded-lg w-full max-w-2xl mx-4 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-600">
          <h2 className="text-xl font-semibold text-white">
            Document Rejected
          </h2>
          {/* <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button> */}
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Rejection Reason Section */}
          <div className="bg-[#1e2f47] rounded-lg p-4 border border-red-500/30">
            <div className="flex items-start gap-3">
              <AlertCircle
                className="text-red-500 mt-1 flex-shrink-0"
                size={20}
              />
              <div className="flex-1">
                <h3 className="text-white font-medium mb-2">
                  Rejection Reason
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {rejectionReason}
                </p>
              </div>
            </div>
          </div>

          {/* Upload Section */}
          <div>
            <label className="block text-white font-medium mb-3">
              Upload New {documentType === "proof" ? "Document" : "Photo"}
            </label>

            <div className="relative">
              <input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                accept={
                  documentType === "proof"
                    ? ".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp"
                    : "image/*"
                }
                className="hidden"
              />
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center gap-2 bg-[#1e2f47] border-2 border-dashed border-gray-600 hover:border-yellow-500 rounded-lg p-8 cursor-pointer transition-all"
              >
                <Upload className="text-gray-400" size={24} />
                <span className="text-gray-300">
                  {selectedFile ? selectedFile.name : "Click to upload file"}
                </span>
              </label>
            </div>

            {selectedFile && (
              <p className="text-green-400 text-sm mt-2">
                ✓ File selected: {selectedFile.name}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-600">
          {/* <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            Cancel
          </button> */}
          <button
            onClick={handleSubmit}
            disabled={!selectedFile}
            className="px-6 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Reupload Document
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectionModal;
