import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Copyright } from "@components/Copyright/Copyright";
import { registerUserAction } from "@features/user/userActions";
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { useNavigate } from "react-router";
import { swalClose, swalLoading } from "@utils/swal.util";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  EMAIL_REQUIRED_YUP,
  FIRST_NAME_REQUIRED_YUP,
  LAST_NAME_REQUIRED_YUP,
  PASSWORD_MAX_YUP,
  PASSWORD_MIN_YUP,
  PASSWORD_REQUIRED_YUP,
} from "@constants/yup.constants";
import * as yup from "yup";

const theme = createTheme();

interface IFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

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
  })
  .required();

export default function SignUp() {
  const { loading, userInfo, error, success } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (success && userInfo) {
      navigate("/dashboard/home");
    }
  }, [success, userInfo]);

  useEffect(() => {
    if (loading) swalLoading();
    else swalClose();
  }, [loading]);

  const onSubmit = (data: IFormInputs) => {
    dispatch(registerUserAction(data));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("firstName")}
                  autoComplete="given-name"
                  name="firstName"
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  fullWidth
                  id="firstName"
                  label="Nombre completo"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("lastName")}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  fullWidth
                  id="lastName"
                  label="Apellidos"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrarse
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  ¿Ya tienes cuenta? Inicia sesión
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
