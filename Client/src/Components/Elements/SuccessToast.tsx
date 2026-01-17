import { toast } from "react-toastify"

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    icon: () => <span className="text-xl">🎉</span>,
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    className: "bg-white/90 backdrop-blur-md shadow-2xl border border-green-100 rounded-2xl !mb-4 text-sm font-bold text-gray-800",
    progressClassName: "bg-green-500",
    style: {
      padding: "16px",
      borderRadius: "16px",
      boxShadow: "0 10px 40px -10px rgba(34,197,94,0.3)",
    },
  });
};


