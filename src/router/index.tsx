import AuthPage from "../pages/auth/AuthPage";
import ProfilePage from "../pages/profile/ProfilePage";
import RegistrationPage from "../pages/registration/RegistrationPage";
import AppLayout from "../layouts/AppLayout";
import TodoPage from "../pages/todo/TodoPage";
import ProtectedRoute from "../components/ProtectedRoute";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
// import UsersPage from "../pages/users/Users";

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
        element: <ProtectedRoute>{/* <UsersPage /> */}</ProtectedRoute>,
      },
    ],
  },
]);

export default router;
