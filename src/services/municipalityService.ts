import { MunicipalityInterface } from '@interfaces/axios/municipality.interface'
import { axiosInstance } from 'config/http'

export const getMunicipalitiesByState = async (id: number) => {
  return await axiosInstance.get<MunicipalityInterface[]>(
    process.env.REACT_APP_BASE_URL + '/municipality/by-state/' + id
  )
}
