// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./userActions";
import { userLogin } from "./userActions";


export interface StateReducerInterface {
  loading: boolean;
  error: string | null;
  success: boolean;
  userInfo?: any | null;
  userToken?: string | null;
}

const initialState: StateReducerInterface = {
  loading: false,
  userInfo: null,
  userToken: null,
  error: null,
  success: false,
};


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    // register user
    [registerUser.pending]: (state: StateReducerInterface) => {
      state.loading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state: StateReducerInterface, _: any) => {
      state.loading = false;
      state.success = true; // registration successful,
      state.userInfo = _.payload.info;
      state.userToken = _.payload.access_token;
    },
    [registerUser.rejected]: (state: StateReducerInterface, { payload }: any) => {
      state.loading = false;
      state.error = payload;
    },
    // login user
    [userLogin.pending]: (state: StateReducerInterface) => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state: StateReducerInterface, _: any) => {
      state.loading = false;
      state.success = true; // registration successful,
      state.userInfo = _.payload.info;
      state.userToken = _.payload.access_token;
    },
    [userLogin.rejected]: (state: StateReducerInterface, { payload }: any) => {
      state.loading = false;
      state.error = payload;
    },
  },
});
export default userSlice.reducer;
