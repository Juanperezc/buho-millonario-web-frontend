import { ILotteryFormValueInterface } from '@components/Forms/Lottery/LotteryForm'
import { LotteryInterface } from '@interfaces/axios/lottery.interface'
import { axiosInstance } from 'config/http'

export const activeLottery = async () => {
  return await axiosInstance.get<LotteryInterface>(
    process.env.REACT_APP_BASE_URL + '/lottery/active'
  )
}

export const showLottery = async (id: number | string) => {
  return await axiosInstance.get<LotteryInterface>(
    process.env.REACT_APP_BASE_URL + '/lottery/' + id
  )
}

export const createLottery = async (data: ILotteryFormValueInterface) => {
  return await axiosInstance.post<LotteryInterface>(
    process.env.REACT_APP_BASE_URL + '/lottery',
    data
  )
}

export const updateLottery = async (
  id: number | string,
  data: ILotteryFormValueInterface
) => {
  return await axiosInstance.put<LotteryInterface>(
    process.env.REACT_APP_BASE_URL + '/lottery/' + id,
    data
  )
}

export const deleteLottery = async (id: number | string) => {
  return await axiosInstance.delete(
    process.env.REACT_APP_BASE_URL + '/lottery/' + id
  )
}
