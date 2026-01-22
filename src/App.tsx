import { RouterProvider } from "react-router-dom";
import { App as AntdApp, notification } from "antd";
import router from "./router";
import LoadingSpinner from "./components/app/LoadingSpinner";
import { useEffect, useState } from "react";
import { useAppDispatch } from "./store/hooks/hooks";
import { checkAuth, logout } from "./store/authActions";
import { AxiosError } from "axios";

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
          if (error instanceof AxiosError) {
            notification.error({
              message: "Auth init failed:",
              description: ` ${error.response?.data}`,
            });
          }
        }
      } else {
        dispatch(logout());
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
