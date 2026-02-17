import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { checkAuth } from "../store/authActions";
import { notification } from "antd";
import LoadingSpinner from "../components/app/LoadingSpinner";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  const dispatch = useAppDispatch();
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    const initAuth = async () => {
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          await dispatch(checkAuth()).unwrap();
        } catch (error) {
          console.log(error);
          if (error) {
            notification.error({
              message: "Authentication Error",
              description: ` ${error || "An error occurred during authentication initialization."}`,
            });
          }
        }
      }
      setIsInitialized(true);
    };

    initAuth();
  }, [dispatch]);

  if (!isInitialized) return <LoadingSpinner />;

  return <Outlet />;
};

export default RootLayout;
