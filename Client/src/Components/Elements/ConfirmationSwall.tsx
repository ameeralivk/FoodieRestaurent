import Swal from "sweetalert2";

export const showConfirm = async (
  title = "Are you sure?",
  text = "Do you want to proceed?",
  confirmButtonText = "Yes",
  cancelButtonText = "Cancel"
): Promise<boolean> => {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText,
    cancelButtonText,
  });

  return result.isConfirmed;
};