import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Grid, InputAdornment, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import Box from '@mui/material/Box'
import { useQuery } from 'react-query'
import { getAllStates } from '@services/stateService'
import { useEffect } from 'react'
import { getParishesByMunicipality } from '@services/parishService'
import { getMunicipalitiesByState } from '@services/municipalityService'
import { AutocompleteInterface } from '@interfaces/components/autocomplete.interface'
import AutocompleteHookForm from '@components/HookForm/Autocomplete'
import MuiPhoneInput from '@components/HookForm/MuiPhoneInput'
import DatePicker from '@components/HookForm/DatePicker'
import dayjs from 'dayjs'

interface IFormStateInterface {
  firstName: boolean
  lastName: boolean
  state: boolean
  municipality: boolean
  parish: boolean
  dni: boolean
  birthDate: boolean
  phone: boolean
  address: boolean
  email: boolean
  password: boolean
}

export interface IFormValueInterface {
  firstName: string
  lastName: string
  state: AutocompleteInterface | null
  municipality: AutocompleteInterface | null
  parish: AutocompleteInterface | null
  dni: string
  birthDate: Date
  phone: string
  address: string
  email: string
  password: string
}
interface UserFormInterface {
  schema: any
  visibility?: Partial<IFormStateInterface>
  disabled?: Partial<IFormStateInterface>
  defaultValues?: Partial<IFormValueInterface>
  submitText: string
  onSubmit: (data: IFormValueInterface) => void
}

const defaultValueInit: IFormValueInterface = {
  firstName: '',
  lastName: '',
  state: null,
  municipality: null,
  parish: null,
  dni: '',
  birthDate: dayjs().subtract(18, 'year').toDate(),
  phone: '',
  address: '',
  email: '',
  password: ''
}

const defaultVisibilityInit: IFormStateInterface = {
  firstName: true,
  lastName: true,
  state: true,
  municipality: true,
  parish: true,
  dni: true,
  birthDate: true,
  phone: true,
  address: true,
  email: true,
  password: true
}

const defaultDisabledInit: IFormStateInterface = {
  firstName: false,
  lastName: false,
  state: false,
  municipality: false,
  parish: false,
  dni: false,
  birthDate: false,
  phone: false,
  address: false,
  email: false,
  password: false
}

const UserForm = (props: UserFormInterface): JSX.Element => {
  // default visibility all true
  const defaultValueFields = { ...defaultValueInit, ...props.defaultValues }
  const visibilityFields = { ...defaultVisibilityInit, ...props.visibility }
  const disabledFields = { ...defaultDisabledInit, ...props.disabled }

  const {
    register,
    resetField,
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors }
  } = useForm<IFormValueInterface>({
    defaultValues: defaultValueFields,
    resolver: yupResolver(props.schema)
  })

  // useForm watch values
  const selectedState = watch('state') as any
  const selectedMunicipality = watch('municipality') as any

  // useQuery values
  const queryStates = useQuery('states', getAllStates, {
    enabled: false
  })

  const queryMunicipalities = useQuery(
    ['municipalities'],
    async () => await getMunicipalitiesByState(selectedState?.value),
    {
      enabled: false
    }
  )

  const queryParishes = useQuery(
    ['parishes'],
    async () => await getParishesByMunicipality(selectedMunicipality?.value),
    {
      enabled: false
    }
  )

  useEffect(() => {
    void queryStates.refetch()
  }, [])

  useEffect(() => {
    if (selectedState && !isSubmitting) {
      resetField('municipality')
      resetField('parish')
      queryParishes.remove()
      void queryMunicipalities.refetch()
    }
  }, [selectedState])

  useEffect(() => {
    if (selectedMunicipality && !isSubmitting) {
      resetField('parish')
      void queryParishes.refetch()
    }
  }, [selectedMunicipality])

  const onSubmit = (data: IFormValueInterface) => {
    props.onSubmit(data)
  }

  // others functions

  const getStateOptions = () => {
    return (
      queryStates.data?.data.map((option) => {
        return { label: option.name, value: option.id }
      }) ?? []
    )
  }

  const getMunicipalityOptions = () => {
    return (
      queryMunicipalities.data?.data.map((option) => {
        return { label: option.name, value: option.id }
      }) ?? []
    )
  }

  const getParishOptions = () => {
    return (
      queryParishes.data?.data.map((option) => {
        return { label: option.name, value: option.id }
      }) ?? []
    )
  }

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ mt: 3 }}
    >
      <Grid container spacing={2}>
        {visibilityFields.email && (
          <Grid item xs={12}>
            <TextField
              {...register('email')}
              disabled={disabledFields.email}
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
            />
          </Grid>
        )}
        {visibilityFields.password && (
          <Grid item xs={12}>
            <TextField
              {...register('password')}
              disabled={disabledFields.password}
              error={!!errors.password}
              helperText={errors.password?.message}
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="new-password"
            />

            <Alert severity={'info'} className="mt-4">
              La contraseña debe tener entre 8 y 20 caracteres.
            </Alert>
          </Grid>
        )}

        {visibilityFields.firstName && (
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('firstName')}
              disabled={disabledFields.firstName}
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
        )}
        {visibilityFields.lastName && (
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('lastName')}
              disabled={disabledFields.lastName}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              fullWidth
              id="lastName"
              label="Apellidos"
              name="lastName"
            />
          </Grid>
        )}
        {visibilityFields.birthDate && (
          <Grid item xs={12}>
            <DatePicker
              maxDate={dayjs().subtract(18, 'year').toDate()}
              disabled={disabledFields.birthDate}
              control={control}
              errors={errors}
              name="birthDate"
              label="Fecha de nacimiento"
            />
          </Grid>
        )}
        {visibilityFields.dni && (
          <Grid item xs={12}>
            <TextField
              disabled={disabledFields.dni}
              {...register('dni')}
              error={!!errors.dni}
              helperText={errors.dni?.message}
              fullWidth
              id="dni"
              label="Cédula"
              name="dni"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">VE</InputAdornment>
                )
              }}
            />
          </Grid>
        )}
        {visibilityFields.state && (
          <Grid item xs={12} sm={6}>
            <AutocompleteHookForm
              disabled={disabledFields.state}
              control={control}
              register={register('state')}
              loading={queryStates.isLoading}
              name="state"
              label="Estado"
              options={getStateOptions()}
              errors={errors}
            />
          </Grid>
        )}
        {visibilityFields.municipality && (
          <Grid item xs={12} sm={6}>
            <AutocompleteHookForm
              disabled={disabledFields.municipality}
              control={control}
              register={register('municipality')}
              loading={queryMunicipalities.isLoading}
              name="municipality"
              label="Municipio"
              options={getMunicipalityOptions()}
              errors={errors}
            />
          </Grid>
        )}
        {visibilityFields.parish && (
          <Grid item xs={12}>
            <AutocompleteHookForm
              disabled={disabledFields.parish}
              control={control}
              register={register('parish')}
              loading={queryParishes.isLoading}
              name="parish"
              label="Parroquia"
              options={getParishOptions()}
              errors={errors}
            />
          </Grid>
        )}
        {visibilityFields.address && (
          <Grid item xs={12}>
            <TextField
              disabled={disabledFields.address}
              {...register('address')}
              error={!!errors.address}
              helperText={errors.address?.message}
              fullWidth
              id="address"
              label="Dirección"
              name="address"
            />
          </Grid>
        )}
        {visibilityFields.phone && (
          <Grid item xs={12}>
            <MuiPhoneInput
              disabled={disabledFields.phone}
              control={control}
              errors={errors}
              name="phone"
              label="Teléfono"
            />
          </Grid>
        )}
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {props.submitText}
      </Button>
    </Box>
  )
}

export default UserForm
