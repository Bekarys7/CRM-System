import type { FormItemProps, FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { registerNewUser } from "../../api/authApi";
import type { AuthSignUp } from "../../types/Auth.types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";

const formItemLayout: FormProps = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout: FormItemProps = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const App: React.FC = () => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [form] = Form.useForm<AuthSignUp>();
  const [errorMessage, setIsErrorMessage] = useState<string>("");

  const onFinish = async (values: AuthSignUp) => {
    try {
      await registerNewUser({
        email: values.email,
        login: values.login,
        password: values.password,
        phoneNumber: values.phoneNumber,
        username: values.username,
      });
      setIsRegistered(true);
    } catch (error) {
      if (error instanceof Error && error instanceof AxiosError) {
        setIsErrorMessage(error.response?.data);
      }
    }
  };

  return (
    <>
      {isRegistered ? (
        <p>
          Account created successfully
          <br />
          <Link to="/auth"> Go to Auth</Link>
        </p>
      ) : (
        <p>{errorMessage}</p>
      )}
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        <Form.Item
          name="username"
          label="Nickname"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: "Please input your username!",
              whitespace: true,
            },
            { min: 1, message: "Minimum of 1 characters" },
            { max: 64, message: "Maximum of 60 charecters" },
            { pattern: new RegExp(/^[а-яА-ЯёЁa-zA-Z0-9]+$/) },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="login"
          label="Login"
          rules={[
            {
              required: true,
              message: "Please input your login!",
            },
            {
              pattern: new RegExp(/^[a-zA-Z0-9]+$/),
              message: "only latin alphabet",
            },
            { min: 2, message: "Minimum of 2 characters" },
            { max: 60, message: "Maximum of 60 charecters" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="phoneNumber" label="Phone Number">
          <Input style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default App;
