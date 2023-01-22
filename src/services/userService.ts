import { UserInterface } from '@interfaces/axios/user.interface'
import { UpdateProfileInterface } from '@interfaces/forms/user.interface'
import { axiosInstance } from 'config/http'

export const listUsers = async () => {
  return await axiosInstance.get<UserInterface[]>(
    process.env.REACT_APP_BASE_URL + '/user'
  )
}

export const showUser = async (id: number | string) => {
  return await axiosInstance.get<UserInterface>(
    process.env.REACT_APP_BASE_URL + '/user/' + id
  )
}

export const updateUser = async (id: number, data: UpdateProfileInterface) => {
  return await axiosInstance.put<UserInterface>(
    process.env.REACT_APP_BASE_URL + '/user/' + id,
    data
  )
}

export const restoreAccount = async (id: number) => {
  return await axiosInstance.post(
    process.env.REACT_APP_BASE_URL + '/user/restore/' + id
  )
}
