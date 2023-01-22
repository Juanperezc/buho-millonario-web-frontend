import LotteryForm, {
  ILotteryFormValueInterface,
} from "@components/Forms/Lottery/LotteryForm";
import lotterySchema from "@schemas/lottery.schema";
import { createLottery } from "@services/lotteryService";
import { swalError, swalLoading, swalSuccess } from "@utils/swal.util";
import { useEffect } from "react";
import { useMutation } from "react-query";

const schema = lotterySchema;

const CreateLottery = () => {
  const handleMutationCreateLottery = useMutation(
    (data: ILotteryFormValueInterface) => {
      return createLottery(data);
    }
  );

  useEffect(() => {
    if (handleMutationCreateLottery.isSuccess) {
      swalSuccess("Sorteo creado con éxito");
      const id = handleMutationCreateLottery.data?.data?.id;
      window.location.href = `/dashboard/lotteries/edit/${id}`;
    }
    if (handleMutationCreateLottery.isError) {
      swalError("Error al crear el sorteo");
    }
    if (handleMutationCreateLottery.isLoading) {
      swalLoading("Creando sorteo");
    }
  }, [handleMutationCreateLottery.status]);

  const onSubmit = (data: ILotteryFormValueInterface) => {
    handleMutationCreateLottery.mutate(data);
  };

  return (
    <>
      <LotteryForm schema={schema} onSubmit={onSubmit} submitText="Crear" />
    </>
  );
};

export default CreateLottery;
