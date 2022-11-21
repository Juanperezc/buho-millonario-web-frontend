import { ParishInterface } from "@interfaces/axios/parish.interface";
import { axiosInstance } from "config/http";

export const getParishesByMunicipality = (id: number) => {
  return axiosInstance.get<ParishInterface[]>(
    process.env.REACT_APP_BASE_URL + "/parish/by-municipality/" + id
  );
};
