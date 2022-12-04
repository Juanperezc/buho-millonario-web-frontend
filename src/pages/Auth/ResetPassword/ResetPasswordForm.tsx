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
  PASSWORD_CONFIRM_MATCH_YUP,
  PASSWORD_MAX_YUP,
  PASSWORD_MIN_YUP,
  PASSWORD_REQUIRED_YUP,
} from "shared/constants/yup.constants";
import { swalError, swalLoading, swalSuccess } from "@utils/swal.util";
import { useQuery } from "react-query";
import { resetPassword } from "@services/authService";
import { Alert, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GENERIC_ERROR_MESSAGE } from "@constants/error.constants";
import { SUCCESS_PASSWORD_RESET } from "@constants/success.constants";

interface IFormInputs {
  token: string;
  password: string;
  confirm_password: string;
}

const schema = yup
  .object({
    password: yup
      .string()
      .required(PASSWORD_REQUIRED_YUP)
      .min(8, PASSWORD_MIN_YUP)
      .max(16, PASSWORD_MAX_YUP),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password"), null], PASSWORD_CONFIRM_MATCH_YUP),
    token: yup.string().required("Token is required"),
  })
  .required();

export default function ResetPasswordForm() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const resetPasswordQuery = useQuery(
    "reset-password",
    () => resetPassword(getValues()),
    {
      enabled: false,
      retry: 0,
    }
  );

  useEffect(() => {
    if (token) {
      setValue("token", token);
    }
  }, [token]);

  const onSubmit = () => {
    console.log('onSubmit')
    resetPasswordQuery.refetch();
  };

  useEffect(() => {
    if (resetPasswordQuery.isSuccess) {
      swalSuccess(SUCCESS_PASSWORD_RESET);
      navigate("/sign-in");
    }
  }, [resetPasswordQuery.isSuccess]);

  useEffect(() => {
    if (resetPasswordQuery.isError) {
      swalError(GENERIC_ERROR_MESSAGE);
    }
  }, [resetPasswordQuery.isError]);

  useEffect(() => {
    if (resetPasswordQuery.isLoading) swalLoading();
  }, [resetPasswordQuery.isLoading]);

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
          Restablecer contraseña
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            {...register("password")}
            type="password"
            margin="normal"
            error={errors.password ? true : false}
            helperText={errors.password?.message}
            required
            fullWidth
            id="password"
            label="Contraseña"
            name="password"
            autoFocus
          />
          <Alert severity={"info"} className="my-4">
            La contraseña debe tener entre 8 y 20 caracteres.
          </Alert>
          <TextField
            {...register("confirm_password")}
            type="password"
            margin="normal"
            error={errors.confirm_password ? true : false}
            helperText={errors.confirm_password?.message}
            required
            fullWidth
            id="confirm_password"
            label="Repetir contraseña"
            name="confirm_password"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Restablecer contraseña
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
