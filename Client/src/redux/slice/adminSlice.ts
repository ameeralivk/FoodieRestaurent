import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AdminType } from "../../types/AdminTypes";
interface AuthState {
  admin: AdminType | null;
  token: string | null;
  loading:boolean;
  error:string;
}

interface LoginPayload {
  admin: AdminType;
  token: string;
}

interface SetAccessTokenPayload {
  newAccessToken: string;
}

const initialState: AuthState = {
  admin: null,
  token: null,
  loading:false,
  error:"",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<LoginPayload>) => {
      const { admin, token } = action.payload;
      state.admin = { ...admin };
      state.token = token;
    },
    logoutAction: (state) => {
      state.admin = null;
      state.token = null;
    },
    setAccessToken: (state, action: PayloadAction<SetAccessTokenPayload>) => {
      state.token = action.payload.newAccessToken;
    },
    updateStatus: (state, action: PayloadAction<string>) => {
      if (state.admin) {
        state.admin.status = action.payload;
      }
    },
  },
});

export const { loginAction, logoutAction, setAccessToken , updateStatus } = authSlice.actions;
export default authSlice.reducer;
