import { axiosInstance } from "config/http";

export const signUp = (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  return axiosInstance.post(process.env.REACT_APP_BASE_URL + "/auth/sign-up", {
    email,
    password,
    firstName,
    lastName,
  });
};
export const signIn = (email: string, password: string) => {
  return axiosInstance.post(process.env.REACT_APP_BASE_URL + "/auth/sign-in", {
    email,
    password,
  });
};
