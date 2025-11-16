import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type{ userType } from "../../types/userTypes";

interface UserAuthState {
  user: userType | null;
  token: string | null;
}

interface UserLoginPayload {
  user: userType;
  token: string;
}

interface SetUserAccessTokenPayload {
  newAccessToken: string;
}

const initialState: UserAuthState = {
  user: null,
  token: null,
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    userLoginAction: (state, action: PayloadAction<UserLoginPayload>) => {
      const { user, token } = action.payload;
      state.user = { ...user };
      state.token = token;
    },
    userLogoutAction: (state) => {
      state.user = null;
      state.token = null;
    },
    setUserAccessToken: (
      state,
      action: PayloadAction<SetUserAccessTokenPayload>
    ) => {
      state.token = action.payload.newAccessToken;
    },
    updateUserStatus: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.status = action.payload;
      }
    },
  },
});

export const {
  userLoginAction,
  userLogoutAction,
  setUserAccessToken,
  updateUserStatus,
} = userAuthSlice.actions;

export default userAuthSlice.reducer;
