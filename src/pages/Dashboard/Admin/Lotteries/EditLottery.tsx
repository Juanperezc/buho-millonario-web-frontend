import LotteryForm, {
  ILotteryFormValueInterface
} from '@components/Forms/Lottery/LotteryForm'
import { LotteryInterface } from '@interfaces/axios/lottery.interface'
import { LinearProgress } from '@mui/material'
import lotterySchema from '@schemas/lottery.schema'
import { showLottery, updateLottery } from '@services/lotteryService'
import { swalError, swalLoading, swalSuccess } from '@utils/swal.util'
import { useEffect } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

const schema = lotterySchema

const EditLottery = () => {
  const { id } = useParams<{ id: string }>()

  const { data, status, refetch } = useQuery(
    ['lottery'],
    async () => await showLottery(id ?? ''),
    {
      enabled: false
    }
  )
  const lottery = data?.data as unknown as LotteryInterface
  const handleMutationEditLottery = useMutation(
    async (data: ILotteryFormValueInterface) => {
      if (id) return await updateLottery(id, data)

      return await Promise.resolve(null)
    }
  )

  useEffect(() => {
    if (id) {
      void refetch()
    }
  }, [id])

  useEffect(() => {
    if (handleMutationEditLottery.isSuccess) {
      swalSuccess('Sorteo guardado con éxito')
    }
    if (handleMutationEditLottery.isError) {
      swalError('Error al guardar el sorteo')
    }
    if (handleMutationEditLottery.isLoading) {
      swalLoading('Guardando sorteo')
    }
  }, [handleMutationEditLottery.status])

  const defaultValues = {
    ...lottery
  }
  const onSubmit = (data: ILotteryFormValueInterface) => {
    handleMutationEditLottery.mutate(data)
  }

  if (status === 'loading' || lottery === undefined) {
    return <LinearProgress />
  } else {
    return (
      <>
      <h3><b>ID:</b> {id}</h3>
        <LotteryForm
          schema={schema}
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          disabled={{
            ticketPrice: true,
            reward1Digits: true,
            reward2Digits: true,
            reward3Digits: true,
            reward4Digits: true,
            reward5Digits: true
          }}
          submitText="Guardar"
        />
      </>
    )
  }
}

export default EditLottery
