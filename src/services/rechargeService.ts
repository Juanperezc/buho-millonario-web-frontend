import { IRechargeFormValue } from "@components/Forms/Recharge/RechargeForm";
import axios from "axios";

export const recharge = (data: IRechargeFormValue) => {
  return axios.post("/recharge", data);
};
