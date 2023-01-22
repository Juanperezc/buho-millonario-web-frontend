import { MunicipalityInterface } from './municipality.interface'

export interface ParishInterface {
  id: number
  name: string
  municipality: MunicipalityInterface
  createdAt: string
  updatedAt: string
}
