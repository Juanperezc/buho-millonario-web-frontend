import { ParishInterface } from "./parish.interface";

export type UserInterface = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phone: string;
  dni: string;
  birthDate: Date;
  budget: number;
  address: string;
  parish: ParishInterface;
  closeReason: string;
  deletedAt: Date;
};
