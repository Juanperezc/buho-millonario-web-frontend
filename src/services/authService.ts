import {
  SignInUserInterface,
  SignUpUserInterface,
  UpdateProfileInterface,
} from "@interfaces/forms/user.interface";
import { axiosInstance } from "config/http";

export const signUp = <T>(data: SignUpUserInterface) => {
  return axiosInstance.post<T>(
    process.env.REACT_APP_BASE_URL + "/auth/sign-up",
    data
  );
};

export const signIn = <T>(data: SignInUserInterface) => {
  return axiosInstance.post<T>(
    process.env.REACT_APP_BASE_URL + "/auth/sign-in",
    data
  );
};

export const getProfile = <T>() => {
  return axiosInstance.get<T>(
    process.env.REACT_APP_BASE_URL + "/auth/profile"
  );
};


export const updateProfile = <T>(data: UpdateProfileInterface) => {
  return axiosInstance.put<T>(
    process.env.REACT_APP_BASE_URL + "/auth/profile",
    data
  );
};