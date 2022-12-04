import { UserInterface } from "@interfaces/axios/user.interface";
import { UpdateProfileInterface } from "@interfaces/forms/user.interface";
import { axiosInstance } from "config/http";

export const listUsers = () => {
  return axiosInstance.get<UserInterface[]>(
    process.env.REACT_APP_BASE_URL + "/user"
  );
};

export const showUser = (id: number | string) => {
  return axiosInstance.get<UserInterface>(
    process.env.REACT_APP_BASE_URL + "/user/" + id
  );
};

export const updateUser = (id: number, data: UpdateProfileInterface) => {
  return axiosInstance.put<UserInterface>(
    process.env.REACT_APP_BASE_URL + "/user/" + id,
    data
  );
};

export const restoreAccount = (id: number) => {
  return axiosInstance.post(
    process.env.REACT_APP_BASE_URL + "/user/restore/" + id
  );
}