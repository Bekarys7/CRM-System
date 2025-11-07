import AuthPage from "./pages/auth/AuthPage";
import ProfilePage from "./pages/profile/ProfilePage";
import RegistrationPage from "./pages/registration/RegistrationPage";
import AppLayout from "./layouts/AppLayout";
import TodoPage from "./pages/todo/TodoPage";
import ProtectedRoutes from "./components/ProtectedRoute";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks/hooks";
import { checkAuth } from "./store/authActions";

const router = createBrowserRouter([
  { path: "/auth", children: [{ index: true, element: <AuthPage /> }] },
  {
    path: "/registration",
    children: [{ index: true, element: <RegistrationPage /> }],
  },

  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="tasks" replace /> },
      {
        path: "tasks",
        element: (
          <ProtectedRoutes>
            <TodoPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoutes>
            <ProfilePage />
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);

function App() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  console.log("token", token);
  console.log(localStorage.getItem("refreshToken"));
  useEffect(() => {
    if (localStorage.getItem("refreshToken")) {
      dispatch(checkAuth());
    }
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
