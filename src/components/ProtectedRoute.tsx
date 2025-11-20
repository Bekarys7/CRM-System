import { useAppSelector } from "../store/hooks/hooks";
import type { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const authStatus = useAppSelector((state) => state.auth.status);

  if (authStatus === "unauthenticated") {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;
