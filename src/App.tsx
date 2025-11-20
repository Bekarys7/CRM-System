import { RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch } from "./store/hooks/hooks";
import { checkAuth } from "./store/authActions";
import { App as AntdApp, notification } from "antd";
import LoadingSpinner from "./components/app/LoadingSpinner";
import router from "./router";

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
          notification.error({
            message: "Auth check failed",
            description: `${error}`,
          });
        }
      }

      setIsInitialized(true);
    };

    initAuth();
  }, [dispatch]);

  if (!isInitialized) {
    return <LoadingSpinner />;
  }

  return (
    <AntdApp>
      <RouterProvider router={router} />
    </AntdApp>
  );
}

export default App;
