import { LittleAnimalInterface } from './little-animal.interface'
import { LotteryInterface } from './lottery.interface'
import { WinnerTicketInterface } from './winner-ticket.interface'

export interface TicketInterface {
  winnerTicket: WinnerTicketInterface
  lottery: LotteryInterface
  id: number
  code: string
  amount: number
  littleAnimal: LittleAnimalInterface
  createdAt: string
  updatedAt: string
}
