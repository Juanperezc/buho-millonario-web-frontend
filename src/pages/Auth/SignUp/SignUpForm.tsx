import { useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Copyright } from '@components/Copyright/Copyright'
import { registerUserAction } from '@features/user/userActions'
import { useAppDispatch, useAppSelector } from '@app/hooks'
import { useNavigate } from 'react-router'
import { swalClose, swalLoading } from '@utils/swal.util'
import {
  BIRTH_DATE_REQUIRED_YUP,
  DNI_REQUIRED_YUP,
  EMAIL_REQUIRED_YUP,
  FIRST_NAME_REQUIRED_YUP,
  LAST_NAME_REQUIRED_YUP,
  MUNICIPALITY_REQUIRED_YUP,
  PARISH_REQUIRED_YUP,
  PASSWORD_MAX_YUP,
  PASSWORD_MIN_YUP,
  PASSWORD_REQUIRED_YUP,
  STATE_REQUIRED_YUP
} from '@constants/yup.constants'
import * as yup from 'yup'
import UserForm, {
  IFormValueInterface
} from '@components/Forms/UserForm/UserForm'
import { SignUpUserInterface } from '@interfaces/forms/user.interface'
import dayjs from 'dayjs'
import { Grid, Link } from '@mui/material'

const schema = yup
  .object({
    firstName: yup.string().required(FIRST_NAME_REQUIRED_YUP),
    lastName: yup.string().required(LAST_NAME_REQUIRED_YUP),
    email: yup.string().required(EMAIL_REQUIRED_YUP),
    password: yup
      .string()
      .required(PASSWORD_REQUIRED_YUP)
      .min(8, PASSWORD_MIN_YUP)
      .max(16, PASSWORD_MAX_YUP),
    state: yup.mixed().required(STATE_REQUIRED_YUP),
    municipality: yup.mixed().required(MUNICIPALITY_REQUIRED_YUP),
    parish: yup.mixed().required(PARISH_REQUIRED_YUP),
    birthDate: yup.date().required(BIRTH_DATE_REQUIRED_YUP).nullable(),
    dni: yup.string().required(DNI_REQUIRED_YUP)
  })
  .required()

export default function SignUpForm (): JSX.Element {
  const { loading, userInfo, success } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    if (success && userInfo) {
      navigate('/dashboard/home')
    }
  }, [success, userInfo])

  useEffect(() => {
    if (loading) swalLoading()
    else swalClose()
  }, [loading])

  const onSubmit = (data: IFormValueInterface) => {
    const httpParam: SignUpUserInterface = {
      parishId: data.parish?.value ?? 1,
      birthDate: dayjs(data.birthDate).toDate(),
      dni: data.dni,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password
    }
    dispatch(registerUserAction(httpParam))
  }

  return (

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography component="h1" variant="h5">
           Registro
          </Typography>
          <UserForm
            submitText="Registrarse"
            schema={schema}
            onSubmit={onSubmit}
            visibility={{ address: false, phone: false }}
          />
        </Box>
        <Grid container>
          <Grid item xs={12} className="text-center">
            <Link href="sign-in" variant="body2">
              ¿Tienes cuenta? Inicia sesión
            </Link>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Container>

  )
}
