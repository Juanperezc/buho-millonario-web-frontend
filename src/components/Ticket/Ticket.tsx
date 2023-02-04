import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

interface ComponentProps {
  price: number
  code: string
  littleAnimalName: string
  image: string
}

export default function TicketComponent ({
  price,
  code,
  littleAnimalName,
  image
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
                <span className='absolute top-2 left-12'>Codigo: {code}</span>
              </div>

            </div>
            <img className=" w-40" src="/animal-fondo.png" />
            <img className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-36" src={image} />
          </div>

        </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Sorteo #{code}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Animal: {littleAnimalName}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Ver mas</Button>
        </CardActions>
      </div>
    </Card>
  )
}
