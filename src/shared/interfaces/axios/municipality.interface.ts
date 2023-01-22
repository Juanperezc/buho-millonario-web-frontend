import { StateInterface } from './state.interface'

export interface MunicipalityInterface {
  id: number
  name: string
  state: StateInterface
  createdAt: string
  updatedAt: string
}
