import { Card, CardContent } from '@mui/material'
import SignInForm from './SignInForm'

export default function SignIn () {
  // material ui theme login
  return (
    <Card>
      <CardContent>
        <SignInForm />
      </CardContent>
    </Card>
  )
}
