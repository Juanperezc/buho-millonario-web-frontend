import { axiosInstance } from 'config/http'

export interface StateInterface {
  id: number
  name: string
  country: string
  createdAt: string
  updatedAt: string
}

export const getAllStates = async () => {
  return await axiosInstance.get<StateInterface[]>(
    process.env.REACT_APP_BASE_URL + '/state'
  )
}
