import {toast} from "react-toastify"

export const showSuccessToast = (message: string) => {
  toast.success(`✅ ${message}`, {
    autoClose: 4000,
    position: "top-center",
    style: {
      background: "#22c55e",
      color: "#ffffff",
      fontWeight: "bold",
      borderRadius: "8px",
    },
  });
};


