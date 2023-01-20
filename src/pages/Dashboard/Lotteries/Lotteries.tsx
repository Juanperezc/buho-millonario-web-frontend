import { Box, Button, Grid as GridMaterial } from "@mui/material";
import { LotteryInterface } from "@interfaces/axios/lottery.interface";
import { Grid, h } from "gridjs";
import { esES } from "gridjs/l10n";
import { useEffect, useRef } from "react";
import { swalError, swalLoading, swalQuestion } from "@utils/swal.util";
import { useMutation } from "react-query";
import { deleteLottery } from "@services/lotteryService";
import dayjs from "dayjs";


const Lotteries = () => {
  const tableRef: any = useRef<Grid>(null);
  const gridJs = new Grid({
    className: {
      table: "w-full",
    },
    columns: [
      {
        name: "Id",
        hidden: true,
      },
      {
        name: "Fecha de inicio",
        formatter: (_cell, row) => {
          return dayjs(row.cells[1].data as string).format("DD/MM/YYYY");
        }
      },
      {
        name: "Fecha de fin",
        formatter: (_cell, row) => {
          return dayjs(row.cells[2].data as string).format("DD/MM/YYYY");
        }
      },
      "Titulo",
      "Precio del ticket",
      {
        name: "Acciones",
        formatter: (_cell, row) => {
          return [
            h(
              "button",
              {
                className:
                  "py-2 mb-4 px-4 border rounded-md text-white bg-primary",
                onClick: () => {
                  showLottery(row.cells[0].data as number);
                },
              },
              "Ver"
            ),
            h(
              "button",
              {
                className:
                  "py-2 mb-4 px-4 border rounded-md text-white bg-warning",
                onClick: () => {
                  editLottery(row.cells[0].data as number);
                },
              },
              "Editar"
            ),
            dayjs(row.cells[1].data as string).toDate() > new Date() &&
              h(
                "button",
                {
                  className:
                    "py-2 mb-4 px-4 border rounded-md text-white bg-danger",
                  onClick: () => {
                    handleDeleteLottery(row.cells[0].data as number);
                  },
                },
                "Eliminar"
              ),
          ];
        },
      },
    ],
    resizable: true,
    pagination: {
      enabled: true,
      limit: 8,
    },

    search: true,
    sort: true,
    language: esES,
    server: {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
      url: process.env.REACT_APP_BASE_URL + "/lottery",
      then: (data: LotteryInterface[]) =>
        data.map((lottery) => [
          lottery.id,
          lottery.startDate,
          lottery.finishDate,
          lottery.title,
          lottery.ticketPrice,
        ]),
    },
  });

  const handleMutationDelete = useMutation((id: number) => {
    return deleteLottery(id);
  });
  const showLottery = (id: number) => {
    window.location.href = "/dashboard/lotteries/show/" + id;
  };

  const editLottery = (id: number) => {
    window.location.href = "/dashboard/lotteries/edit/" + id;
  };

  const handleDeleteLottery = (id: number) => {
    swalQuestion("¿Estás seguro de eliminar esta lotería?").then((resp) => {
      if (resp.isConfirmed) handleMutationDelete.mutate(id);
    });
  };

  useEffect(() => {
    gridJs.render(tableRef.current);
  }, []);

  useEffect(() => {
    if (handleMutationDelete.isSuccess) {
      window.location.href = "/dashboard/lotteries";
    }
    if (handleMutationDelete.isError) {
      swalError("Error al eliminar la lotería");
    }
    if (handleMutationDelete.isLoading) {
      swalLoading("Eliminando lotería");
    }
  }, [handleMutationDelete.status]);

  const handleCreateLottery = () => {
    window.location.href = "/dashboard/lotteries/create";
  };

  return (
    <Box>
      <GridMaterial container>
        <GridMaterial item xs={12}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              onClick={handleCreateLottery}
              color="primary"
            >
              {" "}
              Crear Sorteo{" "}
            </Button>
          </Box>
        </GridMaterial>
        <GridMaterial item xs={12}>
          <div ref={tableRef}></div>
        </GridMaterial>
      </GridMaterial>
    </Box>
  );
};
export default Lotteries;
