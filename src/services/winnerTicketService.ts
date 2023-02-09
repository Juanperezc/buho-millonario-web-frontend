import { WinnerTicketInterface } from '@interfaces/axios/winner-ticket.interface'
import { axiosInstance } from 'config/http'

export const claimTicket = async (id: number) => {
  return await axiosInstance.post<WinnerTicketInterface>(
    process.env.REACT_APP_BASE_URL + '/winner-ticket/claim/' + id
  )
}
