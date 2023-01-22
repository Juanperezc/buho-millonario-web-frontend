import { IRechargeFormValue } from '@components/Forms/Recharge/RechargeForm'
import axios from 'axios'

export const recharge = async (data: IRechargeFormValue) => {
  return await axios.post('/recharge', data)
}
