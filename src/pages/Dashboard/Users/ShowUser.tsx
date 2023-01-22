import { Box } from '@mui/system'
import UserForm from '@components/Forms/UserForm/UserForm'
import { Divider, Grid, LinearProgress } from '@mui/material'

import { userSchema } from '@schemas/user.schema'
import { useQuery } from 'react-query'
import { showUser } from '@services/userService'
import { useParams } from 'react-router-dom'

const schema = userSchema

const ShowUser = (): JSX.Element => {
  const queryParam = useParams<{ id: string }>()
  const showUserQuery = useQuery(
    'show-user',
    async () => await showUser(queryParam.id ?? ''),
    {
      enabled: true,
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

  const onSubmit = () => {
    window.location.href = '/dashboard/users/edit/' + queryParam.id
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
            disabled={{
              firstName: true,
              lastName: true,

              email: true,
              dni: true,
              phone: true,
              address: true,
              birthDate: true,
              state: true,
              municipality: true,
              parish: true
            }}
            submitText="Editar perfil"
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
  )
}
export default ShowUser
