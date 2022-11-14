import { useAppDispatch, useAppSelector } from "@app/hooks";
import DashboardLayout from "@components/Layouts/DashboardLayout";
import NoAuthLayout from "@components/Layouts/NoAuthLayout";
import { getProfileAction } from "@features/user/userActions";
import Home from "@pages/Dashboard/Home";
import SignIn from "@pages/SignIn/SignIn";
import SignUp from "@pages/SignUp/SignUp";
import { useEffect } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
function App() {
  const { userToken } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (userToken) {
      console.log("userToken", userToken);
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
      element: <SignIn />,
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
      path: "/dashboard",
      children: [
        {
          path: "*",
          element: <Navigate to="home" replace />,
        },
        {
          path: "home",
          element: (
            <DashboardLayout userToken={userToken}>
              <Home />
            </DashboardLayout>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
