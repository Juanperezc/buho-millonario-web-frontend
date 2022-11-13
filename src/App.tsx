import { useAppSelector } from "@app/hooks";
import Home from "@pages/Dashboard/Home";
import SignIn from "@pages/SignIn/SignIn";
import SignUp from "@pages/SignUp/SignUp";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ProtectedRoute } from "shared/guards/routes.guard";

function App() {
  const { userInfo } = useAppSelector((state) => state.user);

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
      element: <SignUp />,
    },
    {
      path: "/dashboard",
      children: [
        {
          path: "*",
          element: <Navigate to="/dashboard/home" replace />,
        },
        {
          path: "home",
          element: ProtectedRoute({ userInfo, children: <Home /> }),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
