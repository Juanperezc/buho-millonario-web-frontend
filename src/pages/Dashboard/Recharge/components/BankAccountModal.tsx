import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField
} from '@mui/material'
import { IRechargeFormValue } from '@components/Forms/Recharge/RechargeForm'
import { bankAccountData } from '@constants/bank_account.constants'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
interface IModalProps {
  data: IRechargeFormValue | undefined
  isOpen: boolean
  handleClose: () => void
  onSubmitModal: (data: IRechargeFormValue) => void
}

const bankAccountSchema = Yup.object().shape({
  reference_text: Yup.string().required('Numero de referencia es requerido')
})

export default function BankAccountModal ({
  data,
  isOpen,
  handleClose,
  onSubmitModal
}: IModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(bankAccountSchema)
  })

  const onSubmit = (data: any) => {
    onSubmitModal(data)
    reset()
  }

  const accountSelected = bankAccountData.find(
    (account) => account.code === data?.type.value
  )
  return (
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle className="text-2xl" id="alert-dialog-title">
            Datos para la transferencia
          </DialogTitle>
          <DialogContent>
              <Alert className="mb-5" severity="info">
                <strong>Importante:</strong> Para que tu recarga sea procesada,
                debes realizar la transferencia a la cuenta bancaria o pago
                movil que se muestra a continuación. Una vez realizada la
                transferencia, debes llenar el campo <b>Numero de referencia</b>
              </Alert>
              <p>
              <strong>Nombre del titular:</strong> {accountSelected?.holder}
              </p>
              <p>
                <strong>Numero de cuenta:</strong>{' '}
                {accountSelected?.account_number}
              </p>
              <p>
                <strong>Banco:</strong> {accountSelected?.bank}
              </p>
              <p>
                <strong>Teléfono</strong> {accountSelected?.phone}
              </p>
              <p>
                <strong>Rif</strong> {accountSelected?.rif}
              </p>

              <Grid container>
                <Grid className="mt-5" item xs={12}>
                  <TextField
                    {...register('reference_text')}
                    error={!!errors.reference_text}
                    helperText={
                      errors?.reference_text?.message as React.ReactNode
                    }
                    fullWidth
                    name="reference_text"
                    type={'text'}
                    label="Numero de referencia"
                  />
                </Grid>
              </Grid>

          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained">
              {' '}
              Guardar
            </Button>
            <Button onClick={handleClose}>Cerrar</Button>
          </DialogActions>
        </Box>
      </Dialog>
  )
}
