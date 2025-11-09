import { toast } from "react-toastify";
export const showErrorToast = (message: string = "❌ Something went wrong!") => {
  toast.error(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    style: {
      backgroundColor: "#111827",
      color: "#f87171", // red text
      fontWeight: "bold",
    },
  });
};