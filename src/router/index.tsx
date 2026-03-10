import AuthPage from "../pages/auth/AuthPage";
import ProfilePage from "../pages/profile/ProfilePage";
import RegistrationPage from "../pages/registration/RegistrationPage";
import AppLayout from "../layouts/AppLayout";
import TodoPage from "../pages/todo/TodoPage";
import ProtectedRoute from "../components/ProtectedRoute";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import UsersPage from "../pages/users/UsersPage";
import UserPage from "../pages/users/UserPage";
import RootLayout from "../layouts/RootLayout";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          { index: true, element: <AuthPage /> },
          {
            path: "signUp",
            element: <RegistrationPage />,
          },
        ],
      },
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <Navigate to="tasks" replace /> },
          {
            path: "tasks",
            element: <TodoPage />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
          },
          {
            path: "users",
            element: <UsersPage />,
          },
          {
            path: "users/:id",
            element: (
              <ProtectedRoute>
                <UserPage />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
