import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AdminType } from "../../types/AdminTypes";
interface AuthState {
  admin: AdminType | null;
  loading: boolean;
  isAuthenticated:boolean;
  error: string;
}

interface LoginPayload {
  admin: AdminType;
}


const initialState: AuthState = {
  admin: null,
  isAuthenticated:false,
  loading: false,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<LoginPayload>) => {
      const { admin} = action.payload;
      state.admin = { ...admin };
    },
    logoutAction: (state) => {
      state.admin = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAuth: (
      state,
      action: PayloadAction<{ isAuthenticated: boolean; user?: any }>
    ) => {
      state.isAuthenticated = action.payload.isAuthenticated;
    },

    clearAuth: (state) => {
      state.isAuthenticated = false;
    },
    updateStatus: (state, action: PayloadAction<string>) => {
      if (state.admin) {
        state.admin.status = action.payload;
      }
    },
  },
});

export const {
  loginAction,
  logoutAction,
  updateStatus,
  setAuth,
  setLoading,
  clearAuth,
} = authSlice.actions;
export default authSlice.reducer;
