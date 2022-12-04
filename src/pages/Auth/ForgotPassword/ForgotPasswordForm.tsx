import { useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Copyright } from "@components/Copyright/Copyright";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  EMAIL_REQUIRED_YUP,
} from "shared/constants/yup.constants";
import { swalError, swalLoading, swalSuccess } from "@utils/swal.util";
import { useQuery } from "react-query";
import { forgotPassword, resetPassword } from "@services/authService";
import { Alert, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GENERIC_ERROR_MESSAGE } from "@constants/error.constants";
import { SUCCESS_PASSWORD_FORGOT, SUCCESS_PASSWORD_RESET } from "@constants/success.constants";

interface IFormInputs {
  email: string;
}

const schema = yup
  .object({
    email: yup.string().required(EMAIL_REQUIRED_YUP),
  })
  .required();

export default function ForgotPasswordForm() {
  const navigate = useNavigate();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const forgotPasswordQuery = useQuery(
    "forgot-password",
    () => forgotPassword(getValues()),
    {
      enabled: false,
    }
  );

  const onSubmit = (data: IFormInputs) => {
    forgotPasswordQuery.refetch();
  };

  useEffect(() => {
    if (forgotPasswordQuery.isSuccess) {
      swalSuccess(SUCCESS_PASSWORD_FORGOT);
      navigate("/sign-in");
    }
  }, [forgotPasswordQuery.isSuccess]);

  useEffect(() => {
    if (forgotPasswordQuery.isError) {
      swalError(GENERIC_ERROR_MESSAGE);
    }
  }, [forgotPasswordQuery.isError]);

  useEffect(() => {
    if (forgotPasswordQuery.isLoading) swalLoading();
  }, [forgotPasswordQuery.isLoading]);

  return (
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
        <Typography component="h1" variant="h5">
          Recuperar contraseña
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
          <Alert severity="info">
            Te llegara un correo con un link para restablecer tu contraseña
          </Alert>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Recuperar contraseña
          </Button>
          <Divider></Divider>
          <Grid container>
            <Grid item xs className="text-center pt-5">
              <Link href="sign-in" variant="body2">
                Iniciar sesión
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
