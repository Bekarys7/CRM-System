// components/ProtectedRoutes.tsx

import { useAppSelector } from "../store/hooks/hooks";
import { type JSX } from "react";
import type { FC } from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

const ProtectedRoutes: FC<Props> = ({ children }) => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  if (isAuth) {
    return <Outlet />;
  }

  return isLoading ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default ProtectedRoutes;
