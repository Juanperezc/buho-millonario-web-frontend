import { LotteryInterface } from '@interfaces/axios/lottery.interface'
import { CardMedia, Box, Button, Card, CardActions, CardContent, Grid } from '@mui/material'
import { activeLottery } from '@services/lotteryService'
import { trimString } from '@utils/global.util'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
const GamblerLotteries = () => {
  const navigate = useNavigate()
  const queryLotteries = useQuery('lotteries', activeLottery, {
    enabled: true,
    retry: 0
  })

  const handleShowLottery = (id: string | number) => {
    navigate(`/dashboard/lotteries/show/${id}`)
  }
  const data = queryLotteries.data?.data as unknown as LotteryInterface[]

  useEffect(() => {

  }, [])
  return (
    <Box>
      <Grid container spacing="6">
        <Grid item xs={12}>
        </Grid>
        {data?.map((lottery, key) => (
          <Grid item key={key} sm={6} md={4} xs={12} className='my-3 py-3 h-100 sm:h-100'>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }} className='bg-teal-800 text-white h-full '>
              <CardMedia
                className='h-32'
                component="img"
                image="/pool.jpg"
                alt="lucky img"
              />
              <CardContent>
                <h2 className='text-2xl bold text-amber-200'>{lottery.title}</h2>
                <p><strong>Descripción: </strong>{trimString(lottery.description, 200)}</p>
                <p className='text-green-500'><strong >Precio: </strong>{lottery.ticketPrice} BsS</p>
                <p className='text-yellow-500'><strong >Premio Mayor: </strong>{lottery.reward5Digits} % de lo recaudado</p>

              </CardContent>
              <CardActions disableSpacing sx={{ mt: 'auto', justifyContent: 'center' }} >
                <Button onClick={() => handleShowLottery(lottery.id)} variant="contained"> Ver Sorteo</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
export default GamblerLotteries
