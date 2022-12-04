import { MunicipalityInterface } from "./municipality.interface";

export type ParishInterface = {
  id: number;
  name: string;
  municipality: MunicipalityInterface;
  createdAt: string;
  updatedAt: string;
};