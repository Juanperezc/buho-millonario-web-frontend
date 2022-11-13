import { signIn } from "./../../services/authService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { signUp } from "services/authService";

// userAction.js
export const registerUser: any = createAsyncThunk(
  // action type string
  "user/register",
  // callback function
  async (params: any, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const {data}: any = await signUp(
        params.email,
        params.password,
        params.firstName,
        params.lastName
      );
        console.log('data',data);
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

export const userLogin: any = createAsyncThunk(
  "user/login",
  async (params: any, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const { data }: any = await signIn(params.email, params.password);
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
