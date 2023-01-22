import { TicketInterface } from '@interfaces/axios/ticket.interface'
import { axiosInstance } from 'config/http'

export const getMyTickets = async () => {
  return await axiosInstance.get<TicketInterface[]>(
    process.env.REACT_APP_BASE_URL + '/ticket/me'
  )
}
