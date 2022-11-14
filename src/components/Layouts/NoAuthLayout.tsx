import { Navigate } from "react-router-dom";

interface NoAuthLayoutProps {
  children: JSX.Element;
  userToken: string | null;
}
const NoAuthLayout = ({ children, userToken }: NoAuthLayoutProps) => {
  if (userToken) {
    return <Navigate to={"/dashboard/home"} replace />;
  }
  return <>{children}</>;
};

export default NoAuthLayout;
