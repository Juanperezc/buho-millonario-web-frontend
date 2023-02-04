import React, { useEffect } from 'react'

import { useQuery } from 'react-query'
import { LotteryInterface } from '@interfaces/axios/lottery.interface'
import { showLottery } from '@services/lotteryService'
import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  LinearProgress,
  Typography
} from '@mui/material'
import { Box } from '@mui/system'
import { useParams } from 'react-router-dom'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'

const ShowLottery: React.FC = () => {
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
  const lottery = data?.data as unknown as LotteryInterface

  const handleOnBuyTicket = () => {
    window.location.href = `/dashboard/tickets/buy/${id}`
  }
  if (status === 'loading' || lottery === undefined) {
    return <LinearProgress />
  } else {
    return (
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card className="mt-4 mb-4 p-4">
              <CardContent>
                <Typography
                  variant="h4"
                  component="h2"
                  className="text-center font-medium text-3xl"
                >
                  {lottery.title}
                </Typography>
                <Divider className="my-4" />
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="body2" component="p">
                      {lottery.description}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" className="text-gray-600">
                      Precio del ticket: {lottery.ticketPrice} BsS
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="h5"
                      component="h2"
                      className="text-center font-medium text-2xl"
                    >
                      Premios
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <ul className="list-none ">
                      <li className="my-2">
                        <span className="text-lg text-indigo-500 font-medium">
                          <MonetizationOnIcon />
                        </span>
                        <span>Premio 1: {lottery.reward1Digits} % de lo recaudado</span>
                      </li>
                      <li className="my-2">
                        <span className="text-lg text-indigo-500 font-medium">
                          <MonetizationOnIcon />
                        </span>
                        <span>Premio 2: {lottery.reward2Digits} % de lo recaudado</span>
                      </li>
                      <li className="my-2">
                        <span className="text-lg text-indigo-500 font-medium">
                          <MonetizationOnIcon />
                        </span>
                        <span>Premio 3: {lottery.reward3Digits} % de lo recaudado</span>
                      </li>
                      <li className="my-2">
                        <span className="text-lg text-indigo-500 font-medium">
                          <MonetizationOnIcon />
                        </span>
                        <span>Premio 4: {lottery.reward4Digits} % de lo recaudado</span>
                      </li>
                      <li className="my-2">
                        <span className="text-lg text-indigo-500 font-medium">
                          <MonetizationOnIcon />
                        </span>
                        <span>Premio 5: {lottery.reward5Digits} % de lo recaudado</span>
                      </li>
                    </ul>
                  </Grid>
                  <Grid item xs={12} className="text-center my-4">
                    <Button onClick={handleOnBuyTicket} variant="contained" color="primary">
                      Comprar ticket
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    )
  }
}

export default ShowLottery
