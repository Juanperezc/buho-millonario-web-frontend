import TicketComponent from '@components/Ticket/Ticket'
import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import { getMyTickets } from '@services/ticketService'
import { useEffect } from 'react'
import { useQuery } from 'react-query'

const MyTickets = () => {
  const queryTickets = useQuery('tickets', getMyTickets, {
    enabled: false
  })

  useEffect(() => {
    void queryTickets.refetch()
  }, [])

  return (
    <Box>
      <Grid container>
        {queryTickets.data?.data.map((ticket, i) => (
          <Grid key={i} className="px-4 py-3" item xs={12} sm={6}>
            <TicketComponent
            price={ticket.amount}
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
