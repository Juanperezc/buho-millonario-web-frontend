import { StateInterface } from "./state.interface";

export type MunicipalityInterface = {
  id: number;
  name: string;
  state: StateInterface
  createdAt: string;
  updatedAt: string;
};
