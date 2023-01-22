import { ILotteryFormValueInterface } from "@components/Forms/Lottery/LotteryForm";
import { LotteryInterface } from "@interfaces/axios/lottery.interface";
import { axiosInstance } from "config/http";

export const showLottery = (id: number | string) => {
  return axiosInstance.get<LotteryInterface>(
    process.env.REACT_APP_BASE_URL + "/lottery/" + id
  );
};

export const createLottery = (data: ILotteryFormValueInterface) => {
  return axiosInstance.post<LotteryInterface>(
    process.env.REACT_APP_BASE_URL + "/lottery",
    data
  );
};

export const updateLottery = (
  id: number | string,
  data: ILotteryFormValueInterface
) => {
  return axiosInstance.put<LotteryInterface>(
    process.env.REACT_APP_BASE_URL + "/lottery/" + id,
    data
  );
};

export const deleteLottery = (id: number | string) => {
  return axiosInstance.delete(
    process.env.REACT_APP_BASE_URL + "/lottery/" + id
  );
};
