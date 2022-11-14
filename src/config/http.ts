import { toastError } from "@utils/toast.util";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

axiosInstance.interceptors.request.use(
  async (config: any) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
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
    if (error.response.status === 401) {
      localStorage.removeItem("userToken");
      window.location.href = "/sign-in?error=unauthorized";

    }
    return Promise.reject(error);
  }
);
