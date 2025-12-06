import api from "../services/Api";

export const checkAuth = async (): Promise<boolean> => {
  try {
    console.log("a");
    const res = await api.get("/admin/auth/auth/me");
    console.log(res, "re");
    if (!res.data.authenticated) {
      return false;
    }
    return res.data.authenticated === true ? true : false;
  } catch (error) {
    console.log("checkAuth failed:", error);
    return false;
  }
};
