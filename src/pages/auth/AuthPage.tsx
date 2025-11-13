import React from "react";
import { useAppSelector } from "../../store/hooks/hooks";
import { Navigate } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";

const AuthCard: React.FC = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  if (isAuth) {
    return <Navigate to="/tasks" replace />;
  }

  return (
    <>
      <LoginForm />;
    </>
  );
};
export default AuthCard;
