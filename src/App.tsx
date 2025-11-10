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
import { App as AntdApp } from "antd";
import LoadingSpinner from "./components/app/LoadingSpinner";
// import { toggleIsLoading } from "./store/authSlice";
import AuthLayout from "./layouts/AuthLayout";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { index: true, element: <AuthPage /> },
      {
        path: "signIn",
        element: <RegistrationPage />,
      },
    ],
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
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  useEffect(() => {
    const dispatchData = async () => {
      try {
        // dispatch(toggleIsLoading());
        if (localStorage.getItem("refreshToken")) {
          await dispatch(checkAuth());
        }
      } catch (e) {
        console.log(e);
      }
    };

    dispatchData();
  }, [dispatch]);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <AntdApp>
      <RouterProvider router={router} />
    </AntdApp>
  );
}

export default App;
