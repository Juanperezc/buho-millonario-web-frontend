import { SignInUserInterface } from '@interfaces/forms/user.interface';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { signUp, signIn, getProfile } from "@services/authService";
import { SignUpUserInterface } from "shared/interfaces/forms/user.interface";

// registerAction
export const registerUserAction: any = createAsyncThunk(
  // action type string
  "user/register",
  // callback function
  async (params: SignUpUserInterface, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const {data}: any = await signUp(params);
      localStorage.setItem("userToken", data.access_token);
      return data;
    } catch (error: any) {
      console.log("error", error);
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
  "user/login",
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
  "user/profile",
  async (_, { rejectWithValue }) => {
    try {
      console.log("getProfileAction");
      // configure header's Content-Type as JSON
      const { data }: any = await getProfile();
      console.log('data', data);
      return data;
    } catch (error: any) {
      console.log('error',error)
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
