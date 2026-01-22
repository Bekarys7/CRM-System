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

const router = createBrowserRouter([
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
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="tasks" replace /> },
      {
        path: "tasks",
        element: (
          <ProtectedRoute>
            <TodoPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "users",
        element: (
          <ProtectedRoute>
            <UsersPage />
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: "users/:id",
    element: (
      <ProtectedRoute>
        <UserPage />
      </ProtectedRoute>
    ),
  },
]);

export default router;
