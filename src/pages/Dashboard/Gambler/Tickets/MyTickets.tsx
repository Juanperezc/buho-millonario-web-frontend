import { useAppDispatch } from '@app/hooks'
import TicketComponent from '@components/Ticket/Ticket'
import { getProfileAction } from '@features/user/userActions'
import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import { getMyTickets } from '@services/ticketService'
import { claimTicket } from '@services/winnerTicketService'
import { swalLoading, swalSuccess } from '@utils/swal.util'
import { useEffect } from 'react'
import { useMutation, useQuery } from 'react-query'

const MyTickets = () => {
  const queryTickets = useQuery('tickets', getMyTickets, {
    enabled: false
  })

  const dispatch = useAppDispatch()

  const handleMutationClaimTicket = useMutation(
    async (id: number) => {
      swalLoading()
      const ticket = await claimTicket(id)
      dispatch(getProfileAction())
      void queryTickets.refetch()
      swalSuccess('Se ha reclamado el premio con exito')
      return ticket
    }
  )

  useEffect(() => {
    void queryTickets.refetch()
  }, [])

  const handleClaimPrize = (id: number) => {
    handleMutationClaimTicket.mutate(id)
  }
  return (
    <Box>
      <Grid container>
        {queryTickets.data?.data.map((ticket, i) => (
          <Grid key={i} className="px-4 py-3" item xs={12} sm={6}>
            <TicketComponent
              winnerTicket={ticket.winnerTicket}
              lottery={ticket.lottery}
              price={ticket.amount}
              onClaimPrize={handleClaimPrize}
              code={ticket.code}
              image={ticket.littleAnimal.image}
              littleAnimalName={ticket.littleAnimal.name}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
export default MyTickets
