import { Outlet } from "react-router-dom";
import { Card, Col, Row } from "antd";
import styles from "../pages/auth/AuthPage.module.scss";
import authBackground from "../assets/authBackground.svg";

function AuthLayout() {
  return (
    <>
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
    </>
  );
}
export default AuthLayout;
