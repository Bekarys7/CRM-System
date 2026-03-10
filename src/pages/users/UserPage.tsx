import { Input, Form, Button, Flex, notification, Row, Col } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import UserService from "../../services/user.service";
import { Link, useParams } from "react-router-dom";
import type { User, UserRequest } from "../../types/Users.types";
import { AxiosError } from "axios";

const UserPage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<User>();
  const [isEditMode, setToggleEdit] = useState<boolean>(false);
  const [form] = Form.useForm();
  const { id } = useParams();
  const userId = Number(id);

  const getChangedFields = <T extends Record<string, any>>(
    original: T,
    values: Record<string, any>,
  ): Partial<T> => {
    const dirtyFields: Partial<T> = {};

    Object.keys(values).forEach((key) => {
      if (values[key] !== original[key as keyof T]) {
        dirtyFields[key as keyof T] = values[key];
      }
    });

    return dirtyFields;
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await UserService.getUserById(userId);
        setUserInfo(response);
        form.setFieldsValue({
          username: response.username,
          email: response.email,
          phoneNumber: response.phoneNumber,
        });
      } catch (error) {
        alert(error);
      }
    };
    fetchUserInfo();
  }, [userId]);

  const handleToggleEdit = () => {
    setToggleEdit((prev) => !prev);
  };

  const handleSaveProfile = async (values: UserRequest) => {
    try {
      if (userInfo) {
        const dataToSend = getChangedFields(userInfo, values);
        if (Object.keys(dataToSend).length === 0) {
          setToggleEdit(false);
          return;
        }

        await UserService.editUser(userInfo.id, dataToSend);
        notification.success({ message: "Changes saved" });
        setUserInfo({ ...userInfo, ...dataToSend });
        setToggleEdit(false);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        notification.error({
          message: error?.message || "Failed to edit user",
          description: error?.response?.data || "An error occurred",
        });
      }
    }
  };

  return (
    <div style={{ margin: "0 auto" }}>
      <Row>
        <Col span={10} offset={3}>
          <Title level={2}>User Profile</Title>
        </Col>
      </Row>
      <Form
        form={form}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 10 }}
        onFinish={handleSaveProfile}
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            style={{ backgroundColor: "white", color: "black" }}
            disabled={!isEditMode}
          ></Input>
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input
            style={{ backgroundColor: "white", color: "black" }}
            disabled={!isEditMode}
          ></Input>
        </Form.Item>
        <Form.Item name="phoneNumber" label="Phone Number">
          <Input
            style={{ backgroundColor: "white", color: "black" }}
            disabled={!isEditMode}
          ></Input>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 3, span: 10 }}>
          <Flex gap={"1rem"}>
            <Form.Item label={null}>
              <Button type="primary" danger onClick={handleToggleEdit}>
                Edit
              </Button>
            </Form.Item>
            <Button
              type="primary"
              style={{ backgroundColor: "#73D13D" }}
              disabled={!isEditMode}
              htmlType="submit"
            >
              Save
            </Button>
            <Button type="primary" style={{ backgroundColor: "blue" }}>
              <Link to="/users">Back</Link>
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </div>
  );
};
export default UserPage;
