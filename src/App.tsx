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

const router = createBrowserRouter([
  { path: "/auth", children: [{ index: true, element: <AuthPage /> }] },
  {
    path: "/registration",
    children: [{ index: true, element: <RegistrationPage /> }],
  },

  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          { index: true, element: <Navigate to="tasks" /> },
          { path: "tasks", element: <TodoPage /> },
          { path: "profile", element: <ProfilePage /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
