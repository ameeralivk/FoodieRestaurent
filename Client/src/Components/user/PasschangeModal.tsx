import React from "react";
import UserModal from "../Elements/Reusable/userModal";
interface PasschangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  errors: {
    oldPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}

const PasschangeModal: React.FC<PasschangeModalProps> = ({
  isOpen,
  onClose,
  formData,
  errors,
  onChange,
  onSave,
}) => {
  return (
    <UserModal
      isOpen={isOpen}
      title="Change Password"
      onClose={onClose}
      footer={
        <>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-pink-600 text-white rounded"
          >
            Update Password
          </button>
        </>
      }
    >
      {/* Old Password */}
      <UserModal.Field label="Old Password" htmlFor="oldPassword">
        <input
          id="oldPassword"
          name="oldPassword"
          type="password"
          value={formData.oldPassword}
          onChange={onChange}
          className="w-full border p-2 rounded"
          placeholder="Enter old password"
        />
        {errors.oldPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.oldPassword}
          </p>
        )}
      </UserModal.Field>

      {/* New Password */}
      <UserModal.Field label="New Password" htmlFor="newPassword">
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          value={formData.newPassword}
          onChange={onChange}
          className="w-full border p-2 rounded"
          placeholder="Enter new password"
        />
        {errors.newPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.newPassword}
          </p>
        )}
      </UserModal.Field>

      {/* Confirm Password */}
      <UserModal.Field label="Confirm New Password" htmlFor="confirmPassword">
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={onChange}
          className="w-full border p-2 rounded"
          placeholder="Confirm new password"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword}
          </p>
        )}
      </UserModal.Field>
    </UserModal>
  );
};

export default PasschangeModal;
