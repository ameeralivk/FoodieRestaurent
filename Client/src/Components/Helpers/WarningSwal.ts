
import Swal from "sweetalert2";

interface WarningSwalProps {
  message: string;
}

const WarningSwal = ({ message }: WarningSwalProps) => {
  return Swal.fire({
    title: "Warning!",
    text: message, 
    icon: "warning",
    confirmButtonText: "OK",
    background: "#1f2937", 
    color: "#fff",
    confirmButtonColor: "#f59e0b", 
  });
};

export default WarningSwal;