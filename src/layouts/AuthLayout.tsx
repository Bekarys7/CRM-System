import { Navigate, Outlet } from "react-router-dom";
import { Card, Col, notification, Row } from "antd";
import styles from "../pages/auth/AuthPage.module.scss";
import authBackground from "../assets/authBackground.svg";
import LoadingSpinner from "../components/app/LoadingSpinner";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { checkAuth } from "../store/authActions";

const AuthLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.isAuth);
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

  if (isAuth) {
    return <Navigate to="/tasks" replace />;
  }

  if (!isInitialized) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.authWrapper}>
      <Card
        hoverable
        className={styles.cardStyle}
        styles={{
          body: { padding: 0 },
        }}
      >
        <Row align="middle" style={{ cursor: "default" }}>
          <Col xs={24} md={15}>
            <img
              draggable={false}
              alt="auth-background"
              src={authBackground}
              className={styles.imgStyle}
            />
          </Col>

          <Col xs={24} md={8}>
            <Outlet />
          </Col>
        </Row>
      </Card>
    </div>
  );
};
export default AuthLayout;
