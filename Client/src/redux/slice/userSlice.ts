import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type{ userType } from "../../types/userTypes";

interface UserAuthState {
  user: userType | null;
}

interface UserLoginPayload {
  user: userType;
}

const initialState: UserAuthState = {
  user: null,
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    userLoginAction: (state, action: PayloadAction<UserLoginPayload>) => {
      const { user} = action.payload;
      state.user = { ...user };
    },
    userLogoutAction: (state) => {
      state.user = null;
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
  updateUserStatus,
} = userAuthSlice.actions;

export default userAuthSlice.reducer;
