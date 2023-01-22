export interface LotteryInterface {
  id: number
  title: string
  description: string
  ticketPrice: number
  resultDigits: number
  reward1Digits: number
  reward2Digits: number
  reward3Digits: number
  reward4Digits: number
  reward5Digits: number
  startDate: Date
  finishDate: Date
  createdAt: Date
  updatedAt: Date
}
