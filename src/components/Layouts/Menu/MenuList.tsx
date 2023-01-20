import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import clsx from "clsx";

interface MenuListPrimaryProps {
  role: string;
  open: boolean;
}
const MenuListPrimary = ({ role, open }: MenuListPrimaryProps) => {
  const path = window.location.pathname;

  const isPathName = (pathName: string) => {
    return pathName === path;
  };
  return (
    <React.Fragment>
      <ListItemButton
        className={clsx(
          isPathName("/dashboard/home") ? "bg-primary text-white" : null
        )}
        href="/dashboard/home"
      >
        <ListItemIcon>
          <DashboardIcon
            className={isPathName("/dashboard/home") ? "text-white" : ""}
          />
        </ListItemIcon>
        {open && <ListItemText primary="Inicio" />}
      </ListItemButton>
      {role == "user" && (
        <>
          <ListItemButton>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            {open && (
              <ListItemText sx={{ display: "none" }} primary="Ver Sorteos" />
            )}
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Recargar saldo" />}
          </ListItemButton>
          <ListItemButton href="/dashboard/tickets">
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            {open && (
              <ListItemText sx={{ display: "none" }} primary="Mis tickets" />
            )}
          </ListItemButton>
        </>
      )}
      {role == "admin" && (
        <>
          <ListItemButton
            className={clsx(
              isPathName("/dashboard/lotteries")
                ? "bg-primary text-white"
                : null
            )}
            href="/dashboard/lotteries"
          >
            <ListItemIcon
              className={isPathName("/dashboard/lotteries") ? "text-white" : ""}
            >
              <PeopleIcon />
            </ListItemIcon>
            {open && (
              <ListItemText
                primary="Gestión de Sorteos"
              />
            )}
          </ListItemButton>
          <ListItemButton
            className={clsx(
              isPathName("/dashboard/users") ? "bg-primary text-white" : null
            )}
            href="/dashboard/users"
          >
            <ListItemIcon>
              <PeopleIcon
                className={isPathName("/dashboard/users") ? "text-white" : ""}
              />
            </ListItemIcon>
            {open && <ListItemText primary="Gestión de apostadores" />}
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Reportes" />}
          </ListItemButton>
        </>
      )}
    </React.Fragment>
  );
};

export default MenuListPrimary;
/* export const MenuListSecondary = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
); */
