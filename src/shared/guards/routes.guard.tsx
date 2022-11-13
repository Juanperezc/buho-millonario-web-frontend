import { ProtectedRouteInterface } from "shared/interfaces/routes.interface";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({
  userInfo,
  redirectPath = "/sign-in",
  children,
}: ProtectedRouteInterface) => {
  if (!userInfo) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};
