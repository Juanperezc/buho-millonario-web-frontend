
import { useState } from 'react'
import RechargeForm, {
  IRechargeFormValue
} from '@components/Forms/Recharge/RechargeForm'
import BankAccountModal from './components/BankAccountModal'

const CreateRecharge = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [transactionData, setTransactionData] = useState<IRechargeFormValue>()

  const onSubmit = (data: IRechargeFormValue) => {
    setTransactionData(data)
    setIsModalOpen(true)
  }

  return (
    <>
      <RechargeForm onSubmit={onSubmit} />
      <BankAccountModal
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        data={transactionData}
      />
    </>
  )
}

export default CreateRecharge