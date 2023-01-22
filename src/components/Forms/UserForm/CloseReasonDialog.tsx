import { useEffect, useRef } from 'react'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Dialog from '@mui/material/Dialog'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import FormControlLabel from '@mui/material/FormControlLabel'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { CLOSE_REASON_REQUIRED_YUP } from '@constants/yup.constants'
import { Box } from '@mui/material'
import { useQuery } from 'react-query'
import { closeMyAccount } from '@services/authService'
import { swalClose, swalError, swalLoading } from '@utils/swal.util'
import { useAppDispatch } from '@app/hooks'

const options = [
  'No comprendo la plataforma',
  'Ya no tengo tiempo para jugar',
  'No me gusta el juego',
  'No me gustan los premios',
  'Me encuentro en una situación economica difícil',
  'Me encuentro fuera del país'
]

const schema = yup
  .object({
    closeReason: yup.string().required(CLOSE_REASON_REQUIRED_YUP)
  })
  .required()

export interface CloseReasonDialogProps {
  id: string
  keepMounted: boolean
  open: boolean
  onClose: (value?: string) => void
}

interface IFormValueInterface {
  closeReason: string
}

export default function CloseReasonDialog (props: CloseReasonDialogProps) {
  const { onClose, open, ...other } = props
  const radioGroupRef = useRef<HTMLElement>(null)
  const dispatch = useAppDispatch()
  const {
    control,
    handleSubmit,
    getValues
  } = useForm<IFormValueInterface>({
    defaultValues: {
      closeReason: options[0]
    },
    resolver: yupResolver(schema)
  })

  const closeMyAccountQuery = useQuery(
    'close-my-account',
    async () => await closeMyAccount(getValues()),
    {
      enabled: false,
      retry: 0
    }
  )

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus()
    }
  }

  const handleCancel = () => {
    onClose()
  }

  useEffect(() => {
    if (closeMyAccountQuery.isSuccess) {
      swalClose()
      dispatch({ type: 'user/logout' })
      onClose()
    }
  }, [closeMyAccountQuery.isSuccess])

  useEffect(() => {
    if (closeMyAccountQuery.isError) {
      swalError()
    }
  }, [closeMyAccountQuery.isError])

  const onSubmit = () => {
    swalLoading()
    void closeMyAccountQuery.refetch()
  }

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 1 }}
      >
        <DialogTitle>¿ Por que motivo deseas cerrar tu cuenta?</DialogTitle>
        <DialogContent dividers>
          <Controller
            rules={{ required: true }}
            control={control}
            name="closeReason"
            render={({ field }) => (
              <RadioGroup {...field}>
                {options.map((option) => (
                  <FormControlLabel
                    value={option}
                    key={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel}>
            Cancelar
          </Button>
          <Button type="submit">Cerrar cuenta</Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}
