import { useAppSelector } from "../store/hooks/hooks";
import { type JSX } from "react";
import type { FC } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

const ProtectedRoutes: FC<Props> = ({ children }) => {
  const authStatus = useAppSelector((state) => state.auth.status);

  if (authStatus === "unauthenticated") {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoutes;
