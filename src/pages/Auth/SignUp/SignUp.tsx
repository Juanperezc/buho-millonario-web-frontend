import { Card, CardContent } from '@mui/material'

import SignUpForm from './SignUpForm'

export default function SignUp () {
  return (
    <Card className="mb-10">
      <CardContent>
        <SignUpForm />
      </CardContent>
    </Card>
  )
}
