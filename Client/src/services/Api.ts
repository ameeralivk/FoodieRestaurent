// api/axiosInstance.ts
import axios from "axios";
import { store } from "../redux/store/store";
import { setAccessToken, logoutAction } from "../redux/slice/adminSlice";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});
// Request interceptor: attach access token
api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.get(
          "http://localhost:3000/api/admin/auth/refresh-token",
          {
            withCredentials: true,
          }
        );

        const newAccessToken = res.data.accessToken;
        store.dispatch(setAccessToken({ newAccessToken }));
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (err) {
        store.dispatch(logoutAction());
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
