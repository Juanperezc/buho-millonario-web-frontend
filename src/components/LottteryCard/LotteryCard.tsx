import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

interface ComponentProps {
  code: string
  littleAnimalName: string
  image: string
}

export default function LotteryCard ({
  code,
  littleAnimalName,
  image
}: ComponentProps) {
  return (
    <Card className="w-full">
      <CardMedia
      className="h-48"
        component="img"
        alt={littleAnimalName}
        height="60"
        image={image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Ticket #{code}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          Animal: {littleAnimalName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Condiciones:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Fecha de finalización del sorteo:
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Ver mas</Button>
      </CardActions>
    </Card>
  )
}
