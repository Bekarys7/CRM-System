// components/ProtectedRoutes.tsx

import { useAppSelector } from "../store/hooks/hooks";
import { type JSX } from "react";
import type { FC } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

const ProtectedRoutes: FC<Props> = ({ children }) => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  if (isAuth) {
    return children;
  }

  return <Navigate to="/auth" replace />;
};

export default ProtectedRoutes;
