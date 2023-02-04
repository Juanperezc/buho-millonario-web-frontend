import { useAppDispatch } from '@app/hooks'
import BuyTicketForm, { ITickerFormValueInterface } from '@components/Forms/Ticket/BuyTicketForm'
import { getProfileAction } from '@features/user/userActions'
import { CreateTicketInterface } from '@interfaces/forms/ticket.interface'
import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import { showLottery } from '@services/lotteryService'
import { createTicket } from '@services/ticketService'
import { swalClose, swalLoading, swalSuccess } from '@utils/swal.util'
import { useEffect } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'

export const BuyTicket = () => {
  const dispatch = useAppDispatch()
  const navigation = useNavigate()
  const { id } = useParams<{ id: string }>()

  const { data, status, refetch } = useQuery(
    ['lottery'],
    async () => await showLottery(id ?? ''),
    {
      enabled: false
    }
  )

  useEffect(() => {
    if (id) {
      void refetch()
    }
  }, [id])

  const handleMutationCreateTicket = useMutation(
    async (data: CreateTicketInterface) => {
      try {
        swalLoading()
        const response = await createTicket(data)
        dispatch(getProfileAction())
        swalSuccess('Ticket comprado exitosamente')
        navigation('/dashboard/tickets')
        return response
      } catch (error) {
        swalClose()
        console.error('error', error)
      }
    }
  )

  const onSubmit = (data: ITickerFormValueInterface) => {
    const dataForm = {
      lotteryId: Number(id) ?? 0,
      code: data.code,
      littleAnimalId: Number(data.littleAnimalId?.value)

    }
    console.log('onSubmit', dataForm)
    handleMutationCreateTicket.mutate(dataForm)
  }

  useEffect(() => {
    if (status === 'loading') {
      swalLoading()
    }
    if (status === 'success') {
      swalClose()
    }
  }, [status])

  return (
        <Box>
            <Grid container>
                <Box display={'flex'}>
                    <h2><b>Precio del ticket:</b> {data?.data?.ticketPrice} BsS </h2>
                </Box>
                <BuyTicketForm onSubmit={onSubmit} />
            </Grid>
        </Box>)
}
