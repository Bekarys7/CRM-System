import React from "react";
import { Button, Card, Col, Row, Typography } from "antd";
import authBackground from "../../assets/authBackground.svg";
import styles from "./AuthCard.module.scss";

const AuthCard: React.FC = () => (
  <div className={styles.authWrapper}>
    <Card
      hoverable
      className={styles.cardStyle}
      styles={{
        body: { padding: 0 },
      }}
    >
      <Row align="middle">
        <Col xs={24} md={15}>
          <img
            draggable={false}
            alt="auth-background"
            src={authBackground}
            className={styles.imgStyle}
          />
        </Col>

        <Col xs={24} md={9}>
          <div className={styles.authContent}>
            <Typography.Title level={3} style={{ marginBottom: "32px" }}>
              “Login to your Account”
            </Typography.Title>
            <Button
              type="primary"
              href="https://ant.design"
              target="_blank"
              size="large"
            >
              Get Started
            </Button>
          </div>
        </Col>
      </Row>
    </Card>
  </div>
);

export default AuthCard;
