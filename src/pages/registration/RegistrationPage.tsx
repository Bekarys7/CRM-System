import type { FormItemProps, FormProps } from "antd";
import { Button, Form, Input, App } from "antd";
import type { UserRegistration } from "../../types/Auth.types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks/hooks";
import { register } from "../../store/authActions";

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

const RegistrationPage: React.FC = () => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [form] = Form.useForm<UserRegistration>();
  const [errorMessage, setIsErrorMessage] = useState<string>("");
  const { notification } = App.useApp();
  const dispatch = useAppDispatch();

  const handleRegister = async (values: UserRegistration) => {
    try {
      await dispatch(register(values)).unwrap();
      setIsRegistered(true);
      notification.success({
        message: "Success",
        description: "You have successfully registered",
      });
    } catch (error) {
      notification.error({
        message: "Registration Failed",
        description: `${error}`,
      });
      setIsErrorMessage(`${error}`);
    }
  };

  return (
    <div>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={handleRegister}
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
                  new Error("The passwords you entered do not match!")
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

        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[
            {
              pattern: new RegExp(/^\+?\d{10,11}$/),
              message: "Enter digits only (e.g., 8708ххххххх)",
            },
          ]}
        >
          <Input style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>

      {isRegistered ? (
        <p>
          Account created successfully
          <br />
          <Link to="/auth"> Go to Auth</Link>
        </p>
      ) : (
        <p>{errorMessage}</p>
      )}
    </div>
  );
};

export default RegistrationPage;
