import { useAppDispatch, useAppSelector } from "@app/hooks";
import DashboardLayout from "@components/Layouts/DashboardLayout";
import NoAuthLayout from "@components/Layouts/NoAuthLayout";
import { getProfileAction } from "@features/user/userActions";
import { LocalizationProvider } from "@mui/x-date-pickers";
import Home from "@pages/Dashboard/Home";
import SignIn from "@pages/Auth/SignIn/SignIn";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Profile from "@pages/Dashboard/Profile";
import MyTickets from "@pages/Dashboard/MyTickets";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import ForgotPassword from "@pages/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "@pages/Auth/ResetPassword/ResetPassword";
import SignUp from "@pages/Auth/SignUp/SignUp";
import Users from "@pages/Dashboard/Users/Users";
import EditUser from "@pages/Dashboard/Users/EditUser";
import ShowUser from "@pages/Dashboard/Users/ShowUser";

function App() {
  const queryClient = new QueryClient();

  const { userToken } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (userToken) {
      dispatch(getProfileAction());
    }
  }, []);
  const router = createBrowserRouter([
    {
      path: "*",
      element: <Navigate to="/dashboard/home" replace />,
    },
    {
      path: "/sign-in",
      element: (
        <NoAuthLayout userToken={userToken}>
          <SignIn />
        </NoAuthLayout>
      ),
    },
    {
      path: "/sign-up",
      element: (
        <NoAuthLayout userToken={userToken}>
          <SignUp />
        </NoAuthLayout>
      ),
    },
    {
      path: "/forgot-password",
      element: (
        <NoAuthLayout userToken={userToken}>
          <ForgotPassword />
        </NoAuthLayout>
      ),
    },
    {
      path: "/reset-password",
      element: (
        <NoAuthLayout userToken={userToken}>
          <ResetPassword />
        </NoAuthLayout>
      ),
    },
    {
      path: "/dashboard",
      children: [
        {
          path: "*",
          element: <Navigate to="home" replace />,
        },
        {
          path: "home",
          element: (
            <DashboardLayout title="Inicio" userToken={userToken}>
              <Home />
            </DashboardLayout>
          ),
        },
        {
          path: "profile",
          element: (
            <DashboardLayout title="Mi perfil" userToken={userToken}>
              <Profile />
            </DashboardLayout>
          ),
        },
        {
          path: "users",
          element: (
            <DashboardLayout title="Gestionar apostadores" userToken={userToken}>
              <Users />
            </DashboardLayout>
          ),
        },
        {
          path: "users/edit/:id",
          element: (
            <DashboardLayout title="Editar apostador" userToken={userToken}>
              <EditUser />
            </DashboardLayout>
          ),
        },
        {
          path: "users/show/:id",
          element: (
            <DashboardLayout title="Ver apostador" userToken={userToken}>
              <ShowUser />
            </DashboardLayout>
          ),
        },
        {
          path: "tickets",
          element: (
            <DashboardLayout title="Mis tickets" userToken={userToken}>
              <MyTickets />
            </DashboardLayout>
          ),
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  );
}

export default App;
