import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid, InputAdornment, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import Box from '@mui/material/Box'
import DatePicker from '@components/HookForm/DatePicker'
import dayjs from 'dayjs'

interface IFormStateInterface {
  title: boolean
  description: boolean
  ticketPrice: boolean
  reward1Digits: boolean
  reward2Digits: boolean
  reward3Digits: boolean
  reward4Digits: boolean
  reward5Digits: boolean
  startDate: boolean
  finishDate: boolean
}

export interface ILotteryFormValueInterface {
  title: string
  description: string
  ticketPrice: number
  reward1Digits: number
  reward2Digits: number
  reward3Digits: number
  reward4Digits: number
  reward5Digits: number
  startDate: Date
  finishDate: Date
}
interface LotteryFormInterface {
  schema: any
  disabled?: Partial<IFormStateInterface>
  defaultValues?: Partial<ILotteryFormValueInterface>
  submitText: string
  onSubmit: (data: ILotteryFormValueInterface) => void
}

const defaultValueInit: ILotteryFormValueInterface = {
  title: '',
  description: '',
  ticketPrice: 100,
  reward1Digits: 10,
  reward2Digits: 20,
  reward3Digits: 30,
  reward4Digits: 40,
  reward5Digits: 50,
  startDate: dayjs().toDate(),
  finishDate: dayjs().add(1, 'day').toDate()
}

const defaultDisabledInit: IFormStateInterface = {
  title: false,
  description: false,
  ticketPrice: false,
  reward1Digits: false,
  reward2Digits: false,
  reward3Digits: false,
  reward4Digits: false,
  reward5Digits: false,
  startDate: false,
  finishDate: false
}

const LotteryForm = (props: LotteryFormInterface): JSX.Element => {
  const defaultValueFields = { ...defaultValueInit, ...props.defaultValues }
  const disabledFields = { ...defaultDisabledInit, ...props.disabled }

  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<ILotteryFormValueInterface>({
    defaultValues: defaultValueFields,
    resolver: yupResolver(props.schema)
  })

  // useForm watch values

  const onSubmit = (data: ILotteryFormValueInterface) => {
    props.onSubmit(data)
  }

  // others functions

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ mt: 3 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            {...register('title')}
            disabled={disabledFields.title}
            error={!!errors.title}
            helperText={errors.title?.message}
            fullWidth
            id="title"
            label="Título"
            name="title"
            autoComplete="title"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            {...register('description')}
            multiline
            rows={3}
            maxRows={3}
            disabled={disabledFields.description}
            error={!!errors.description}
            helperText={errors.description?.message}
            fullWidth
            name="description"
            label="Descripción"
            id="description"
            autoComplete="description"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('ticketPrice')}
            disabled={disabledFields.ticketPrice}
            error={!!errors.ticketPrice}
            helperText={errors.ticketPrice?.message}
            fullWidth
            type="number"
            name="ticketPrice"
            label="Precio del ticket"
            id="ticketPrice"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <DatePicker
            minDate={dayjs().toDate()}
            disabled={disabledFields.startDate}
            control={control}
            errors={errors}
            name="startDate"
            label="Fecha de inicio"
          />
        </Grid>
        <Grid item xs={12}>
          <DatePicker
            minDate={watch('finishDate') ?? dayjs().toDate()}
            disabled={disabledFields.finishDate}
            control={control}
            errors={errors}
            name="finishDate"
            label="Fecha de finalización"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('reward1Digits')}
            disabled={disabledFields.reward1Digits}
            error={!!errors.reward1Digits}
            helperText={errors.reward1Digits?.message}
            fullWidth
            type="number"
            name="reward1Digits"
            label="Premio 1 dígito"
            id="reward1Digits"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">%</InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            {...register('reward2Digits')}
            disabled={disabledFields.reward2Digits}
            error={!!errors.reward2Digits}
            helperText={errors.reward2Digits?.message}
            fullWidth
            type="number"
            name="reward2Digits"
            label="Premio 2 dígitos"
            id="reward2Digits"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">%</InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            {...register('reward3Digits')}
            disabled={disabledFields.reward3Digits}
            error={!!errors.reward3Digits}
            helperText={errors.reward3Digits?.message}
            fullWidth
            type="number"
            name="reward3Digits"
            label="Premio 3 dígitos"
            id="reward3Digits"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">%</InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('reward4Digits')}
            disabled={disabledFields.reward4Digits}
            error={!!errors.reward4Digits}
            helperText={errors.reward4Digits?.message}
            fullWidth
            type="number"
            name="reward4Digits"
            label="Premio 4 dígitos"
            id="reward4Digits"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">%</InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('reward5Digits')}
            disabled={disabledFields.reward5Digits}
            error={!!errors.reward5Digits}
            helperText={errors.reward5Digits?.message}
            fullWidth
            type="number"
            name="reward5Digits"
            label="Premio 5 dígitos"
            id="reward5Digits"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">%</InputAdornment>
              )
            }}
          />
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {props.submitText}
      </Button>
    </Box>
  )
}

export default LotteryForm
