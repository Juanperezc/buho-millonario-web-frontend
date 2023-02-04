import { TicketInterface } from '@interfaces/axios/ticket.interface'
import { CreateTicketInterface } from '@interfaces/forms/ticket.interface'
import { axiosInstance } from 'config/http'

export const getMyTickets = async () => {
  return await axiosInstance.get<TicketInterface[]>(
    process.env.REACT_APP_BASE_URL + '/ticket/me'
  )
}

export const createTicket = async (data: CreateTicketInterface) => {
  return await axiosInstance.post<TicketInterface[]>(
    process.env.REACT_APP_BASE_URL + '/ticket',
    data
  )
}

export const changeVisibility = async (ticketId: number) => {
  return await axiosInstance.patch<TicketInterface>(
    process.env.REACT_APP_BASE_URL + `/ticket/change-visibility/${ticketId}/`
  )
}
