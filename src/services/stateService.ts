import { axiosInstance } from "config/http";

export type StateInterface = {
  id: number;
  name: string;
  country: string;
  createdAt: string;
  updatedAt: string;
};

export const getAllStates = () => {
  return axiosInstance.get<StateInterface[]>(
    process.env.REACT_APP_BASE_URL + "/state"
  );
};
