
import { Box } from '@mui/system'
import UserForm, {
  IFormValueInterface
} from '@components/Forms/UserForm/UserForm'
import { Button, Divider, Grid, LinearProgress } from '@mui/material'
import {
} from '@features/user/userActions'
import { useEffect, useState } from 'react'
import {
  swalClose,
  swalError,
  swalLoading,
  swalQuestion,
  swalSuccess
} from '@utils/swal.util'
import { UpdateProfileInterface } from '@interfaces/forms/user.interface'
import dayjs from 'dayjs'
import { userSchema } from '@schemas/user.schema'
import { useQuery } from 'react-query'
import { restoreAccount, showUser, updateUser } from '@services/userService'
import { useParams } from 'react-router-dom'

const schema = userSchema

const EditUser = (): JSX.Element => {
  const [profileData, setProfileData] = useState<UpdateProfileInterface>(
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    {} as UpdateProfileInterface
  )
  const queryParam = useParams<{ id: string }>()
  const showUserQuery = useQuery(
    'show-user',
    async () => await showUser(queryParam.id ?? ''),
    {
      enabled: true,
      retry: 0
    }
  )

  const updateUserQuery = useQuery(
    'update-user',
    async () => await updateUser(Number(queryParam.id) ?? 1, profileData),
    {
      enabled: false,
      retry: 0
    }
  )

  const restoreAccountQuery = useQuery(
    'restore-account',
    async () => await restoreAccount(Number(queryParam.id) ?? 1),
    {
      enabled: false,
      retry: 0
    }
  )
  const userInfo = showUserQuery.data?.data

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
          value: userInfo?.parish.municipality.state.id
        }
      : null,
    municipality: userInfo?.parish
      ? {
          label: userInfo?.parish.municipality.name,
          value: userInfo?.parish.municipality.id
        }
      : null,
    parish: userInfo?.parish
      ? { label: userInfo?.parish.name, value: userInfo?.parish.id }
      : null
  }

  const onSubmit = (data: IFormValueInterface) => {
    const httpParam: UpdateProfileInterface = {
      parishId: data.parish?.value ?? 1,
      birthDate: dayjs(data.birthDate).toDate(),
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      address: data.address
    }

    swalLoading('Actualizando usuario...')
    setProfileData(httpParam)
    setTimeout(() => {
      void updateUserQuery.refetch()
    }, 1000)
  }

  useEffect(() => {
    if (updateUserQuery.isSuccess) {
      swalClose()
      updateUserQuery.remove()
      swalSuccess('Usuario actualizado correctamente')
    }
    if (updateUserQuery.isError) {
      swalClose()
      swalError('Error al actualizar el usuario')
    }
    if (updateUserQuery.isLoading) {
      swalLoading('Actualizando usuario')
    }
  }, [updateUserQuery])

  useEffect(() => {
    if (restoreAccountQuery.isSuccess) {
      swalClose()
      restoreAccountQuery.remove()
      swalSuccess('Cuenta restablecida correctamente')
    }
    if (restoreAccountQuery.isError) {
      swalError('Error al restablecer la cuenta')
    }
    if (restoreAccountQuery.isLoading) {
      swalLoading('Restableciendo cuenta')
    }
  }, [restoreAccountQuery])

  const handleRestoreAccount = () => {
    void swalQuestion('¿Está seguro de restablecer esta cuenta?').then((result) => {
      if (result.isConfirmed) {
        swalLoading('Restableciendo cuenta...')
        void restoreAccountQuery.refetch()
      }
    })
  }

  return (
    <Box>
      {showUserQuery.isLoading
        ? (
        <LinearProgress />
          )
        : (
        <>
          <UserForm
            schema={schema}
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            visibility={{
              password: false
            }}
            submitText="Guardar"
          />
          <Grid container>
            <Grid item xs={12} className="pb-5">
              <Divider></Divider>
            </Grid>
            <Grid item xs={12}>
              {userInfo?.deletedAt && (
                <Button
                  className="text-center"
                  onClick={handleRestoreAccount}
                  type="button"
                  variant="contained"
                  color="inherit"
                >
                  Restablecer Cuenta
                </Button>
              )}
            </Grid>
          </Grid>
        </>
          )}
    </Box>
  )
}
export default EditUser
