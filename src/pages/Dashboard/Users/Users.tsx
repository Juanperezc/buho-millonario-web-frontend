import { Box, Grid as GridMaterial } from "@mui/material";
import { UserInterface } from "@interfaces/axios/user.interface";
import { Grid, h } from "gridjs";
import { esES } from "gridjs/l10n";
import { useEffect, useRef } from "react";
import { trimString } from "@utils/global.util";
const Users = () => {
  const tableRef: any = useRef(<div></div>);
  const gridJs = new Grid({
    className: {
      table: "w-full",
    },
    columns: [
      {
        name: "Id",
        hidden: true,
      },
      "Nombre",
      {
        name: "Email",
        formatter: (_cell) => {
          return trimString(_cell?.toString() ?? "", 22);
        },
      },
      "Cédula",
      "Teléfono",
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
                  showUser(row.cells[0].data as number);
                },
              },
              "Ver"
            ),
            h(
              "button",
              {
                className:
                  "py-2 mb-4 px-4 border rounded-md text-white bg-primary",
                onClick: () => {
                  editUser(row.cells[0].data as number);
                },
              },
              "Editar"
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
      url: process.env.REACT_APP_BASE_URL + "/user",
      then: (data: UserInterface[]) =>
        data.map((user) => [
          user.id,
          user.firstName,
          user.email,
          user.dni,
          user.phone,
        ]),
    },
  });

  const showUser = (id: number) => {
    window.location.href = "/dashboard/users/show/" + id;
  };

  const editUser = (id: number) => {
    window.location.href = "/dashboard/users/edit/" + id;
  };

  useEffect(() => {
    gridJs.render(tableRef.current);
  });

  return (
    <Box>
      <GridMaterial container>
        <GridMaterial item xs={12}>
          <div ref={tableRef}></div>
        </GridMaterial>
      </GridMaterial>
    </Box>
  );
};
export default Users;
