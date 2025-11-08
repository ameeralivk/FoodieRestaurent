  
  
  import {  toast } from "react-toastify";
  const handleSubmits = async () => {
  const loadingToast = toast.loading("Processing... Please wait");

  try {
  
    await new Promise(resolve => setTimeout(resolve, 2000));
    toast.update(loadingToast, {
      render: " Successfully Registered!",
      type: "success",
      isLoading: false,
      position: "top-center",
      theme: "colored",
      style: {
        backgroundColor: "#111827",
        color: "#facc15",
        fontWeight: "bold",
      },
      autoClose: 2000,
      closeOnClick: true
    });
    return true
  } catch (err) {
    toast.update(loadingToast, {
      render: "❌ Something went wrong!",
      type: "error",
      isLoading: false,
      autoClose: 2000
    });
  }
};

export default handleSubmits