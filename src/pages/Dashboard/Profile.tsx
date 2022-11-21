import { useAppDispatch, useAppSelector } from "@app/hooks";

import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
  ADDRESS_REQUIRED_YUP,
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
  PHONE_REQUIRED_YUP,
  STATE_REQUIRED_YUP,
} from "@constants/yup.constants";
import { Box } from "@mui/system";
import UserForm, {
  IFormValueInterface,
} from "@components/Forms/UserForm/UserForm";
import { LinearProgress } from "@mui/material";
import {
  updateProfileAction,
  updateProfileType,
} from "@features/user/userActions";
import { useEffect } from "react";
import {
  swalClose,
  swalError,
  swalLoading,
  swalSuccess,
} from "@utils/swal.util";
import { isString } from "lodash";
import { UpdateProfileInterface } from "@interfaces/forms/user.interface";
import dayjs from "dayjs";

const schema = yup
  .object({
    firstName: yup.string().required(FIRST_NAME_REQUIRED_YUP),
    lastName: yup.string().required(LAST_NAME_REQUIRED_YUP),
    email: yup.string().required(EMAIL_REQUIRED_YUP),
    state: yup.mixed().required(STATE_REQUIRED_YUP),
    municipality: yup.mixed().required(MUNICIPALITY_REQUIRED_YUP),
    parish: yup.mixed().required(PARISH_REQUIRED_YUP),
    birthDate: yup.date().required(BIRTH_DATE_REQUIRED_YUP).nullable(),
    dni: yup.string().required(DNI_REQUIRED_YUP),
    phone: yup.string().required(PHONE_REQUIRED_YUP).nullable(),
    address: yup.string().required(ADDRESS_REQUIRED_YUP),
  })
  .required();

const Profile = (): JSX.Element => {
  const { loading, error, success, userInfo, lastAction } = useAppSelector(
    (state) => state.user
  );

  console.log(loading, userInfo);
  const dispatch = useAppDispatch();

  const defaultValues = {
    firstName: userInfo?.firstName,
    lastName: userInfo?.lastName,
    email: userInfo?.email,
    dni: userInfo?.dni,
    phone: userInfo?.phone,
    address: userInfo?.address,
    birthDate: userInfo?.birthDate,
  };

  useEffect(() => {
    if (success && lastAction == updateProfileType)
      swalSuccess("Perfil actualizado correctamente");
  }, [success]);

  useEffect(() => {
    if (loading && lastAction == updateProfileType) {
      swalLoading();
    } else {
      swalClose();
    }
  }, [loading]);

  useEffect(() => {
    if (error && lastAction == updateProfileType && isString(error)) {
      swalError(error);
    }
  }, [error]);

  const onSubmit = (data: IFormValueInterface) => {
    const httpParam: UpdateProfileInterface = {
      parishId: data.parish?.value ?? 1,
      birthDate: dayjs(data.birthDate).toDate(),
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      address: data.address,
    };
    console.log("httpParam", httpParam);
    dispatch(updateProfileAction(httpParam));
  };

  return (
    <Box>
      {loading ? (
        <LinearProgress />
      ) : (
        <UserForm
          schema={schema}
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          visibility={{
            password: false,
          }}
          disabled={{
            email: true,
            dni: true,
          }}
          submitText="Guardar"
        />
      )}
    </Box>
  );
};
export default Profile;
