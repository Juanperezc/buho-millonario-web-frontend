import { useMemo } from "react";
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
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { userLogin } from "@features/user/userActions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  EMAIL_REQUIRED_YUP,
  PASSWORD_REQUIRED_YUP,
} from "shared/constants/yup.constants";
import { swalClose, swalLoading } from "@utils/swal.util";
import { toastError } from "@utils/toast.util";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

interface IFormInputs {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup.string().required(EMAIL_REQUIRED_YUP),
    password: yup
      .string()
      .required(PASSWORD_REQUIRED_YUP)
      .min(8, "El campo permite mínimo 8 caracteres")
      .max(16, "El campo permite máximo 16 caracteres"),
  })
  .required();

export default function SignIn() {
  const { loading, error, success } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IFormInputs) => {
    dispatch(userLogin(data));
  };

  useMemo(() => {
    if (success){
      navigate("/dashboard/home")
    }
  }, [success]);

  useMemo(() => {
    if (error == "Unauthorized") {
      toastError("Email o usuario incorrecto");
    }
  }, [error]);

  useMemo(() => {
    if (loading) swalLoading();
    else swalClose();
  }, [loading]);

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
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              {...register("email")}
              margin="normal"
              error={errors.email ? true : false}
              helperText={errors.email?.message}
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoFocus
            />
            <TextField
              {...register("password")}
              margin="normal"
              error={errors.password ? true : false}
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
              Login
            </Button>
            <Grid container>
              {/*< Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="sign-up" variant="body2">
                  No tienes cuenta? Regístrate
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
