import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import Box from '@mui/material/Box'
import { CreateTicketInterface } from '@interfaces/forms/ticket.interface'
import { Alert, Button, FormControlLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material'
import { getAllLittleAnimals } from '@services/littleAnimalService'
import { useQuery } from 'react-query'
import { LittleAnimalInterface } from '@interfaces/axios/little-animal.interface'
import AutocompleteHookForm from '@components/HookForm/Autocomplete'
import { ticketSchema } from '@schemas/ticket.schema'

export interface ITickerFormValueInterface extends Omit<CreateTicketInterface, 'lotteryId'> {
  littleAnimalId: any
  isRandom: boolean | string
}

interface TicketFormInterface {
  onSubmit: (data: ITickerFormValueInterface) => void
}

const BuyTicketForm = (props: TicketFormInterface): JSX.Element => {
  const resolver = yupResolver(ticketSchema)
  const {

    register,
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<ITickerFormValueInterface>({
    resolver
  })

  const queryLittleAnimals = useQuery(
    'little-animal',
    async () => await getAllLittleAnimals(),
    {
      enabled: true,
      retry: 0
    }
  )

  const queryLittleAnimalsData = queryLittleAnimals.data?.data as LittleAnimalInterface[]

  const getLittleAnimalOptions = () => {
    return (
      queryLittleAnimalsData.map((option) => {
        return { label: option.name, value: option.id }
      }) ?? [])
  }

  const onSubmit = (data: ITickerFormValueInterface) => {
    props.onSubmit(data)
  }

  console.log('errors', errors.littleAnimalId?.message)
  return (<Box
    className='w-full'
    component="form"
    noValidate
    onSubmit={handleSubmit(onSubmit)}
    sx={{ mt: 1 }}
  >
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h2>¿Deseas seleccionar tu ticket?</h2>
        <Alert className="my-2" severity="warning">
          Recuerda que puedes recargar tu saldo en la sección de <a className='text-blue-600 underline'href="/dashboard/recharge/create">recargas</a>.
        </Alert>
        <Alert className="my-2" severity="info">
          Si seleccionas la opción si, podrás elegir el número de tu ticket y el Animalito, en caso contrario se te asignará un número y animalito aleatorio.
        </Alert>
        <Controller
          rules={{ required: true }}
          control={control}
          defaultValue={false}
          name="isRandom"
          render={({ field }) => (
            <RadioGroup {...field}>
              <FormControlLabel
                value={true}
                key={'radio-1'}
                control={<Radio />}
                label={'Si'}
              />
              <FormControlLabel
                value={false}
                key={'radio-2'}
                control={<Radio />}
                label={'No'}
              />
            </RadioGroup>
          )}
        />
      </Grid>
      {watch('isRandom') !== undefined && watch('isRandom') === 'true' && (<><Grid item xs={12}>
        <TextField
          {...register('code')}
          InputProps={{
            autoComplete: 'new-password'
          }}
          error={!!errors?.code}
          helperText={errors?.code?.message}
          fullWidth
          type="search"
          name="code"
          label="Código de 5 dígitos"
          id="code"
        />
      </Grid>
        <Grid item xs={12}>
          <AutocompleteHookForm
            control={control}
            register={register('littleAnimalId')}
            loading={queryLittleAnimals.isLoading}
            name="littleAnimalId"
            label="Animalito"
            options={getLittleAnimalOptions()}
            errors={errors}
          />
        </Grid>
      </>)}
      <Grid item xs={12}>
        <Button type={'submit'} variant="contained">
          Comprar
        </Button>
      </Grid>
    </Grid>
  </Box>)
}

export default BuyTicketForm
