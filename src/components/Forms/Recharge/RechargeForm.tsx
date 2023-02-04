import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  FormControl
} from '@mui/material'
import { useForm } from 'react-hook-form'
import Box from '@mui/material/Box'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import React, { useImperativeHandle, forwardRef } from 'react'
import AutocompleteHookForm from '@components/HookForm/Autocomplete'

const rechargeSchema = Yup.object().shape({
  type: Yup.mixed().required('Selecciona el tipo de cuenta'),
  amount: Yup.number()
    .required('Ingresa el monto de la recarga')
    .positive('Ingresa un monto positivo')
    .integer('Ingresa un monto entero')
})

export interface IRechargeFormValue {
  type: string | any
  amount: number
  reference_text?: string
}

interface IRechargeFormProps {
  onSubmit: (data: IRechargeFormValue) => void
}

const RechargeForm = forwardRef(
  (props: IRechargeFormProps, ref): JSX.Element => {
    const {
      reset,
      control,
      register,
      handleSubmit,
      formState: { errors }
    } = useForm({
      defaultValues: {
        type: '',
        amount: null
      },
      resolver: yupResolver(rechargeSchema)
    })

    const onSubmit = (data: IRechargeFormValue | any) => {
      props.onSubmit(data)
    }

    useImperativeHandle(
      ref,
      () => ({
        handleReset () {
          console.log('reset')
          reset()
        }
      }),
      []
    )

    return (
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <AutocompleteHookForm
              loading={false}
                control={control}
                register={register('type')}
                name="type"
                label="Cuenta"
                options={[
                  { label: 'Provincial', value: 'provincial' },
                  { label: 'Mercantil', value: 'mercantil' }
                ]}
                errors={errors}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register('amount')}
              error={!!errors.amount}
              helperText={errors?.amount?.message as React.ReactNode}
              fullWidth
              name="amount"
              type={'text'}
              label="Monto de la recarga"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">BsS</InputAdornment>
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
)

export default RechargeForm
