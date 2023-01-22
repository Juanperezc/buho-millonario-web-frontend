import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  MenuItem
} from '@mui/material'
import { useForm } from 'react-hook-form'
import Box from '@mui/material/Box'
import * as Yup from 'yup'
import React from 'react'

const rechargeSchema = Yup.object().shape({
  type: Yup.string().required('Selecciona el tipo de cuenta'),
  amount: Yup.number()
    .required('Ingresa el monto de la recarga')
    .positive()
    .integer()
})

export interface IRechargeFormValue {
  type: string
  amount: number
}

interface IRechargeFormProps {
  onSubmit: (data: IRechargeFormValue) => void
}

const RechargeForm = (props: IRechargeFormProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(rechargeSchema)
  })

  const onSubmit = (data: IRechargeFormValue | any) => {
    props.onSubmit(data)
  }

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Tipo de cuenta
            </InputLabel>
            <Select
              {...register('type')}
              error={!!errors.type}
              fullWidth
              name="type"
            >
              <MenuItem value={'bank_account'}>Cuenta bancaria</MenuItem>
              <MenuItem value={'pago_movil'}>Pago movil</MenuItem>
            </Select>
            <FormHelperText error={true}>
              {errors.type?.message as React.ReactNode}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('amount')}
            error={!!errors.amount}
            helperText={errors?.amount?.message as React.ReactNode}
            fullWidth
            name="amount"
            label="Monto de la recarga"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Hacer una recarga
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default RechargeForm
