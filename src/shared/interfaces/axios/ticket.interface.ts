import { LittleAnimalInterface } from "./little-animal.interface";

export type TicketInterface = {
  id: number;
  code: string;
  amount: number;
  littleAnimal: LittleAnimalInterface;
  createdAt: string;
  updatedAt: string;
};
