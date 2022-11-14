// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  getProfileAction,
  registerUserAction,
  userLoginAction,
} from "./userActions";

export interface StateReducerInterface {
  loading: boolean;
  error: string | null;
  success: boolean;
  userInfo: any | null;
  userToken: string | null;
}

// initialize userToken from local storage
const userToken = localStorage.getItem("userToken") ?? null;

const initialState: StateReducerInterface = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userToken");
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // register
    builder.addCase(registerUserAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUserAction.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true; // registration successful
      state.userInfo = payload.info;
      state.userToken = payload.access_token;
    });
    builder.addCase(registerUserAction.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // login
    builder.addCase(userLoginAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(userLoginAction.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true; // registration successful
      state.userInfo = payload.info;
      state.userToken = payload.access_token;
    });
    builder.addCase(userLoginAction.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // getProfile
    builder.addCase(getProfileAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getProfileAction.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true; // registration successful
      state.userInfo = payload.info;
    });
    builder.addCase(getProfileAction.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});
export default userSlice.reducer;
