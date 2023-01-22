import { IRechargeFormValue } from '@components/Forms/Recharge/RechargeForm'
import { Button, Modal, Typography } from '@mui/material'

import { FC } from 'react'

interface IModalProps {
  isOpen: boolean
  handleClose: () => void
  data: IRechargeFormValue | undefined
}

const BankAccountModal: FC<IModalProps> = ({ isOpen, handleClose, data }) => {
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div style={{ padding: 20, textAlign: 'center' }}>
        <Typography variant="h5">Datos para transferencia</Typography>
        <br />
        {/*  <Typography>Cuenta: {data.accountNumber}</Typography>
        <Typography>CLABE: {data.clabe}</Typography>
        <Typography>Banco: {data.bank}</Typography> */}
        <br />
        <Button variant="contained" color="primary" onClick={handleClose}>
          Ok
        </Button>
      </div>
    </Modal>
  )
}

export default BankAccountModal
