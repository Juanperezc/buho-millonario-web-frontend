import { useEffect, useMemo } from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Copyright } from '@components/Copyright/Copyright'
import { useAppDispatch, useAppSelector } from '@app/hooks'
import { userLoginAction } from '@features/user/userActions'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
  EMAIL_REQUIRED_YUP,
  PASSWORD_MAX_YUP,
  PASSWORD_MIN_YUP,
  PASSWORD_REQUIRED_YUP
} from 'shared/constants/yup.constants'
import { swalClose, swalLoading, swalSuccess } from '@utils/swal.util'
import { toastError } from '@utils/toast.util'
import { useNavigate } from 'react-router-dom'
import { SUCCESS_PASSWORD_RESET } from '@constants/success.constants'

interface IFormInputs {
  email: string
  password: string
}

const schema = yup
  .object({
    email: yup.string().required(EMAIL_REQUIRED_YUP),
    password: yup
      .string()
      .required(PASSWORD_REQUIRED_YUP)
      .min(8, PASSWORD_MIN_YUP)
      .max(16, PASSWORD_MAX_YUP)
  })
  .required()

export default function SignInForm () {
  const { loading, error, success, userInfo } = useAppSelector(
    (state) => state.user
  )
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const urlParams = new URLSearchParams(window.location.search)
  const urlError = urlParams.get('error')
  const resetParam = urlParams.get('reset')
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  })

  useMemo(() => {
    if (urlError != null) {
      toastError('Email o contraseña incorrecto')
    }

    if (resetParam) {
      swalSuccess(SUCCESS_PASSWORD_RESET)
    }
  }, [urlError, resetParam])

  const onSubmit = (data: IFormInputs) => {
    dispatch(userLoginAction(data))
  }

  useEffect(() => {
    if (success && userInfo) {
      swalClose()
      navigate('/dashboard/home')
    }
  }, [success, userInfo])

  useEffect(() => {
    if (error) {
      swalClose()
    }
    if (error === 'Unauthorized') {
      swalClose()
      toastError('Email o contraseña incorrecto')
    }
  }, [error])

  useEffect(() => {
    if (loading) swalLoading()
  }, [loading])

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
          Bienvenido
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            {...register('email')}
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoFocus
          />
          <TextField
            {...register('password')}
            margin="normal"
            error={!!errors.password}
            helperText={errors.password?.message}
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Iniciar sesión
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="forgot-password" variant="body2">
                Recuperar contraseña
              </Link>
            </Grid>
            <Grid item>
              <Link href="sign-up" variant="body2">
                ¿No tienes cuenta? Regístrate
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  )
}
