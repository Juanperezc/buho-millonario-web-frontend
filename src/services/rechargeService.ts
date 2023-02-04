import { IRechargeFormValue } from '@components/Forms/Recharge/RechargeForm'
import { axiosInstance } from 'config/http'

export const doRecharge = async (data: IRechargeFormValue) => {
  return await axiosInstance.post(`${process.env.REACT_APP_BASE_URL}/recharge`, data)
}
