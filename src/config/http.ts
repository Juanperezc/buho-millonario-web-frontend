import { toastError } from "@utils/toast.util";
import axios from "axios";
import { toast } from "react-toastify";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

axiosInstance.interceptors.request.use(
  async (config: any) => {
    //  const token = # Your token goes over here;
    //  if (token) {
    //  config.headers.accessToken = token;
    // }

    config.headers["Content-Type"] = "application/json";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log("error", error);
    if (error.response.status === 400) {
      // iterate response.data.message and show it in a toast
      error.response.data.message.forEach((message: string) => {
        toastError(message);
      });
    }
    return Promise.reject(error);
  }
);
