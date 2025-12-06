// import axios from "axios";
// import { store } from "../redux/store/store";
// import { setAccessToken, logoutAction } from "../redux/slice/adminSlice";
// const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
// const REFRESH_URL = import.meta.env.VITE_BACKEND_REFRESH_URL;
// const api = axios.create({
//   baseURL:BASE_URL,
//   withCredentials: true,
// });

// api.interceptors.request.use(
//   (config) => {
//     const state = store.getState();
//     const token = state.auth.token;
//     if (token && config.headers) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     console.log(error.response, "rees");
//     const originalRequest = error.config;
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         console.log("hi ameer ali vk");
//         const res = await axios.get(
//            REFRESH_URL,
//           {
//             withCredentials: true,
//           }
//         );
//         console.log(res, "resulte is ther");
//         const newAccessToken = res.data.accessToken;
//         store.dispatch(setAccessToken({ newAccessToken }));
//         originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
//         return axios(originalRequest);
//       } catch (err) {
//         store.dispatch(logoutAction());
//         return Promise.reject(err);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;

// import axios from "axios";
// import { tokenManager } from "../config/tokenManager";
// import { store } from "../redux/store/store";
// import { logoutAction } from "../redux/slice/adminSlice";

// const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
// const REFRESH_URL = import.meta.env.VITE_BACKEND_REFRESH_URL;

// const api = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,
// });

// api.interceptors.request.use((config) => {
//   const token = tokenManager.get();
//   console.log(token, "hi hellodsafdsafjsdklajfdlasj");
//   if (token && config.headers) {
//     config.headers["Authorization"] = `Bearer ${token}`;
//   }
//   return config;
// });

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const res = await axios.get(REFRESH_URL, { withCredentials: true });
//         const newAccessToken = res.data.accessToken;
//         tokenManager.set(newAccessToken);
//         originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
//         return axios(originalRequest);
//       } catch (err) {
//         tokenManager.clear();
//         store.dispatch(logoutAction());
//         return Promise.reject(err);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;





import axios from "axios";
import { store } from "../redux/store/store";
import { logoutAction, setAuth } from "../redux/slice/adminSlice";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const REFRESH_URL = import.meta.env.VITE_BACKEND_REFRESH_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, 
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios.get(REFRESH_URL, { withCredentials: true });
        return axios(originalRequest);
      } catch (err) {
        store.dispatch(logoutAction());
        store.dispatch(setAuth({isAuthenticated:false}))
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

