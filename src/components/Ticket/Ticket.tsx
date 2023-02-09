import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { LotteryInterface } from '@interfaces/axios/lottery.interface'
import { WinnerTicketInterface } from '@interfaces/axios/winner-ticket.interface'
import dayjs from 'dayjs'

interface ComponentProps {
  winnerTicket: WinnerTicketInterface
  lottery: LotteryInterface
  price: number
  code: string
  littleAnimalName: string
  image: string
  onClaimPrize: (id: number) => void
}

export default function TicketComponent ({
  lottery,
  winnerTicket,
  price,
  code,
  littleAnimalName,
  image,
  onClaimPrize
}: ComponentProps) {
  return (
    <Card className="relative w-full h-96 bg-gradient-to-r from-primary to-secondary text-white" >
      <div className="bg-[url('/monedas-fondo.png')] bg-cover">

        <div className="absolute top-0 right-0">
          <img className="relative" src="/premio-mayor.png" />
          <span className="absolute top-7 left-6 text-sm">{price}BsS</span>
        </div>

        <div className='absolute top-1/4 left-1/3 w-60'>
          <div className='relative'>
            <div className="absolute -bottom-16 -left-5 right-14" >
              <div className='relative'>
                <img src="/boton-estado.png" />
                <span className='absolute top-2 left-12'>Código: {code}</span>
              </div>

            </div>
            <img className=" w-40" src="/animal-fondo.png" />
            <img className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-36" src={image} />
          </div>
          <div className='absolute -bottom-24 -left-2'>
            {winnerTicket
              ? !winnerTicket.isClaim
                  ? (<div>
                  <Button className="bg-green-700" variant={'contained'} onClick={() => onClaimPrize(winnerTicket.id)}>Reclamar premio</Button>
                </div>)
                  : <div className='font-bold text-green-700 ml-5'>Premio reclamado</div>
              : (<div className="ml-3 text-sm center text-center"><b>Fecha de finalización:</b><br></br> {dayjs(lottery.finishDate).format('DD/MM/YYYY')}</div>)}
          </div>

        </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Sorteo {lottery.title}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Animal: {littleAnimalName}
          </Typography>
        </CardContent>

      </div>
    </Card>
  )
}
