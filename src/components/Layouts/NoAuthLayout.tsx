import { Grid } from "@mui/material";
import { swalClose, swalLoading } from "@utils/swal.util";
import { Navigate } from "react-router-dom";

interface NoAuthLayoutProps {
  children: JSX.Element;
  userToken: string | null;
}
const NoAuthLayout = ({ children, userToken }: NoAuthLayoutProps) => {
  if (userToken) {
    swalLoading("Redireccionando...");
    setTimeout(() => {
      swalClose();
    }, 1000);
    return <Navigate to={"/dashboard/home"} replace />;
  }
  return (
    <div className="bg-gradient-to-r from-secondary to-primary">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <div className="my-5">
            <img className="w-25 h-20 mx-auto" src="/buho_logo_blanco.png" />
          </div>
          {children}
        </Grid>
      </Grid>
    </div>
  );
};

export default NoAuthLayout;
