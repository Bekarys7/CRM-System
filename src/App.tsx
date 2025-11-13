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
import { useEffect, useState } from "react";
import { useAppDispatch } from "./store/hooks/hooks";
import { checkAuth } from "./store/authActions";
import { App as AntdApp } from "antd";
import LoadingSpinner from "./components/app/LoadingSpinner";
import AuthLayout from "./layouts/AuthLayout";

function App() {
  const dispatch = useAppDispatch();
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    const initAuth = async () => {
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          await dispatch(checkAuth()).unwrap();
        } catch (error) {
          console.error("Auth check failed:", error);
        }
      }

      setIsInitialized(true);
    };

    initAuth();
  }, [dispatch]);

  if (!isInitialized) {
    return <LoadingSpinner />;
  }

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

  return (
    <AntdApp>
      <RouterProvider router={router} />
    </AntdApp>
  );
}

export default App;
