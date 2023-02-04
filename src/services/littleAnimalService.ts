import { LittleAnimalInterface } from '@interfaces/axios/little-animal.interface'
import { axiosInstance } from 'config/http'

export const getAllLittleAnimals = async () => {
  return await axiosInstance.get<LittleAnimalInterface[]>(
    process.env.REACT_APP_BASE_URL + '/little-animal'
  )
}
