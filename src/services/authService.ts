import {
  SignInUserInterface,
  SignUpUserInterface,
} from "@interfaces/forms/user.interface";
import { axiosInstance } from "config/http";

export const signUp = (data: SignUpUserInterface) => {
  return axiosInstance.post(
    process.env.REACT_APP_BASE_URL + "/auth/sign-up",
    data
  );
};
export const signIn = (data: SignInUserInterface) => {
  return axiosInstance.post(
    process.env.REACT_APP_BASE_URL + "/auth/sign-in",
    data
  );
};

export const getProfile = () => {
  return axiosInstance.get(
    process.env.REACT_APP_BASE_URL + "/auth/profile"
  );
};