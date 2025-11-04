import React from "react";
import { Button, Checkbox, Form, Input, Card, Col, Row, Flex } from "antd";
import authBackground from "../../assets/authBackground.svg";
import styles from "./AuthPage.module.scss";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { login } from "../../services/auth.service";
import type { AuthData } from "../../types/Auth.types";

const AuthCard: React.FC = () => {
  const onFinish = async (values: AuthData) => {
    const data = await login({
      login: values.login,
      password: values.password,
    });
    document.cookie = `token=${data.accessToken}`;
  };

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
            <Form
              name="auth"
              initialValues={{ remember: true }}
              style={{ maxWidth: 360 }}
              onFinish={onFinish}
            >
              <Form.Item
                name="login"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Flex justify="space-between" align="center">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                  <a href="">Forgot password</a>
                </Flex>
              </Form.Item>

              <Form.Item>
                <Button block type="primary" htmlType="submit">
                  Log in
                </Button>
                or <Link to="/registration">Register now!</Link>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Card>
    </div>
  );
};
export default AuthCard;
