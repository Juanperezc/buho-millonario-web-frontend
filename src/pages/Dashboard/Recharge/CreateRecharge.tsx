import { useState, useRef } from 'react'
import RechargeForm, {
  IRechargeFormValue
} from '@components/Forms/Recharge/RechargeForm'
import BankAccountModal from './components/BankAccountModal'
import { getProfileAction } from '@features/user/userActions'
import { useAppDispatch } from '@app/hooks'
import { doRecharge } from '@services/rechargeService'
import { useMutation } from 'react-query'
import { swalError, swalLoading, swalSuccess } from '@utils/swal.util'

const CreateRecharge = () => {
  const dispatch = useAppDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [transactionData, setTransactionData] = useState<IRechargeFormValue>()
  const refRegisterForm = useRef<any>()
  const onSubmitRecharge = (data: IRechargeFormValue) => {
    setTransactionData(data)
    setIsModalOpen(true)
  }

  const handleMutationCreateLottery = useMutation(
    async (data: IRechargeFormValue) => {
      swalLoading('Procesando transacción')
      try {
        await doRecharge(data)
        swalSuccess('Transacción exitosa')
        dispatch(getProfileAction())
        setIsModalOpen(false)
        refRegisterForm?.current.handleReset()
      } catch (error: any) {
        if (error.response.status !== 200) {
          swalError('Error al procesar la transacción')
        } else { swalError() }
      }
    }
  )

  const onSubmitModal = (data: any) => {
    const newData: IRechargeFormValue = {
      type: transactionData?.type?.value,
      amount: transactionData?.amount,
      ...data
    }
    handleMutationCreateLottery.mutate(newData)
  }
  return (
    <>
      <RechargeForm ref={refRegisterForm} onSubmit={onSubmitRecharge} />
      <BankAccountModal
      onSubmitModal={onSubmitModal}
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        data={transactionData}
      />
    </>
  )
}

export default CreateRecharge
