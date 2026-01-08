import { useAppSelector } from "../store/hooks/hooks";
import { type FC, type PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const authStatus = useAppSelector((state) => state.auth.status);

  const location = useLocation();

  if (authStatus === "unauthenticated") {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
