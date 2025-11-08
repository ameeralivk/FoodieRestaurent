import axios from "axios";

interface formData {
  restaurentName: string;
  email: string;
  password: string;
}

// export const register = async (formData: formData) => {
//   try {
//     const response = await axios.post("http://localhost:3000/api/Admin/Auth",formData);
//     console.log(response,'res')
//   } catch (error) {
//      if (error instanceof Error) {
//       throw new Error(error.message);
//     } else {
//       throw new Error("An Unknown error Occured")
//   }
// }
// }
