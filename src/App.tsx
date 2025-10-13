import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import RootLayout from "./pages/RootLayout";
import TodoPage from "./pages/TodoPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <TodoPage /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
  { path: "/auth", children: [{ index: true, element: <AuthPage /> }] },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
