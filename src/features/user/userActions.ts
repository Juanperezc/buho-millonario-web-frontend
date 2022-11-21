import {
  SignInUserInterface,
  UpdateProfileInterface,
} from "@interfaces/forms/user.interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  signUp,
  signIn,
  getProfile,
  updateProfile,
} from "@services/authService";
import { SignUpUserInterface } from "shared/interfaces/forms/user.interface";


export const registerType  = 'user/register';
export const loginType = 'user/login';
export const getProfileType = 'user/getProfile';
export const updateProfileType = 'user/updateProfile';

// registerAction
export const registerUserAction: any = createAsyncThunk(
  // action type string
  registerType,
  // callback function
  async (params: SignUpUserInterface, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const { data }: any = await signUp(params);
      localStorage.setItem("userToken", data.access_token);
      return data;
    } catch (error: any) {
      console.error("error", error);
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
// loginAction
export const userLoginAction: any = createAsyncThunk(
  loginType,
  async (params: SignInUserInterface, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const { data }: any = await signIn(params);
      // store user's token in local storage
      localStorage.setItem("userToken", data.access_token);
      return data;
    } catch (error: any) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// getProfileAction
export const getProfileAction: any = createAsyncThunk(
  getProfileType,
  async (_, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const { data }: any = await getProfile();
      return data;
    } catch (error: any) {
      console.error("error", error);
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// registerAction
export const updateProfileAction: any = createAsyncThunk(
  // action type string
  updateProfileType,
  // callback function
  async (params: UpdateProfileInterface, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const { data }: any = await updateProfile(params);
      return data;
    } catch (error: any) {
      console.error("error", error);
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
