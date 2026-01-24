import React from "react";
import { useAppSelector } from "../../store/hooks/hooks";
import { Navigate } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";
import LoadingSpinner from "../../components/app/LoadingSpinner";

const AuthPage: React.FC = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const status = useAppSelector((state) => state.auth.status);

  if (status === "pending") {
    return <LoadingSpinner />;
  }

  if (isAuth) {
    return <Navigate to="/tasks" replace />;
  }

  <>
    <LoginForm />;
  </>;
};
export default AuthPage;
