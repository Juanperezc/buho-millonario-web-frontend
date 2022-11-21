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
  return <>{children}</>;
};

export default NoAuthLayout;
