import { useAppDispatch, useAppSelector } from "@app/hooks";
import { Box } from "@mui/system";
import UserForm, {
  IFormValueInterface,
} from "@components/Forms/UserForm/UserForm";
import { Divider, Grid, LinearProgress } from "@mui/material";
import {
  updateProfileAction,
  updateProfileType,
} from "@features/user/userActions";
import { useEffect, useState } from "react";
import {
  swalClose,
  swalError,
  swalLoading,
  swalSuccess,
} from "@utils/swal.util";
import { isString } from "lodash";
import { UpdateProfileInterface } from "@interfaces/forms/user.interface";
import dayjs from "dayjs";
import { userSchema } from "@schemas/user.schema";
import { useQuery } from "react-query";
import { showUser, updateUser } from "@services/userService";
import { useParams } from "react-router-dom";

const schema = userSchema;

const EditUser = (): JSX.Element => {
  const [profileData, setProfileData] = useState<UpdateProfileInterface>(
    {} as UpdateProfileInterface
  );
  const queryParam = useParams<{ id: string }>();
  const showUserQuery = useQuery(
    "show-user",
    () => showUser(queryParam.id ?? ""),
    {
      enabled: true,
      retry: 0,
    }
  );

  const updateUserQuery = useQuery(
    "update-user",
    () => updateUser(queryParam.id ?? "", profileData),
    {
      enabled: false,
      retry: 0,
    }
  );

  const userInfo = showUserQuery.data?.data;

  const defaultValues = {
    firstName: userInfo?.firstName,
    lastName: userInfo?.lastName,
    email: userInfo?.email,
    dni: userInfo?.dni,
    phone: userInfo?.phone,
    address: userInfo?.address,
    birthDate: userInfo?.birthDate,
    state: userInfo?.parish
      ? {
          label: userInfo?.parish.municipality.state.name,
          value: userInfo?.parish.municipality.state.id,
        }
      : null,
    municipality: userInfo?.parish
      ? {
          label: userInfo?.parish.municipality.name,
          value: userInfo?.parish.municipality.id,
        }
      : null,
    parish: userInfo?.parish
      ? { label: userInfo?.parish.name, value: userInfo?.parish.id }
      : null,
  };

  const onSubmit = (data: IFormValueInterface) => {
    const httpParam: UpdateProfileInterface = {
      parishId: data.parish?.value ?? 1,
      birthDate: dayjs(data.birthDate).toDate(),
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      address: data.address,
    };

    swalLoading("Actualizando usuario...");
    setProfileData(httpParam);
    setTimeout(() => {
      updateUserQuery.refetch();
    }, 1000);
  };

  useEffect(() => {
    console.log("updateUserQuery", updateUserQuery);
    if (updateUserQuery.isSuccess) {
      swalClose();
      updateUserQuery.remove();
      swalSuccess("Usuario actualizado correctamente");
    }
    if (updateUserQuery.isError) {
      swalClose();
      swalError("Error al actualizar el usuario");
    }
    if (updateUserQuery.isLoading) {
      console.log("tt");
      swalLoading("Actualizando usuario");
    }
  }, [updateUserQuery]);

  return (
    <Box>
      {showUserQuery.isLoading ? (
        <LinearProgress />
      ) : (
        <>
          <UserForm
            schema={schema}
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            visibility={{
              password: false,
            }}
            submitText="Guardar"
          />
          <Grid container>
            <Grid item xs={12} className="pb-5">
              <Divider></Divider>
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};
export default EditUser;
