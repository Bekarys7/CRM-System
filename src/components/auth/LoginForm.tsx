import React from "react";
import { Button, Checkbox, Form, Input, Flex, App } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import type { AuthData } from "../../types/Auth.types";
import { useAppDispatch } from "../../store/hooks/hooks";
import { login } from "../../store/authActions";

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { notification } = App.useApp();
  const navigate = useNavigate();

  const handleLogin = async (values: AuthData) => {
    try {
      await dispatch(login(values)).unwrap();
      navigate("/tasks");
    } catch (error) {
      notification.error({ message: ` ${error}` });
    }
  };

  return (
    <Form
      name="auth"
      initialValues={{ remember: true }}
      style={{ maxWidth: 360 }}
      onFinish={handleLogin}
    >
      <Form.Item
        name="login"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
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
          <Link to={"password"}>Forgot password</Link>
        </Flex>
      </Form.Item>

      <Form.Item>
        <Button block type="primary" htmlType="submit">
          Log in
        </Button>
        or <Link to="signUp">Register now!</Link>
      </Form.Item>
    </Form>
  );
};
export default LoginForm;
