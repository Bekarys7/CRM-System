import { Input, Form, Button, Flex, notification } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import UserService from "../../services/user.service";
import { Link, useParams } from "react-router-dom";
import type { User, UserRequest } from "../../types/Users.types";

const UserPage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<User>();
  const [isEditMode, setToggleEdit] = useState<boolean>(false);
  const [form] = Form.useForm();
  const { id } = useParams();
  const userId = Number(id?.replace(":", ""));

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await UserService.getUserById(userId);
        setUserInfo(response);
      } catch (error) {
        alert(error);
      }
    };
    fetchUserInfo();
  }, [userId]);

  useEffect(() => {
    if (userInfo) {
      form.setFieldsValue({
        username: userInfo.username,
        email: userInfo.email,
        phoneNumber: userInfo.phoneNumber,
      });
    }
  }, [userInfo, form]);

  const handleToggleEdit = () => {
    setToggleEdit((prev) => !prev);
  };

  const handleSaveProfile = async (values: UserRequest) => {
    try {
      if (userInfo) {
        const dataToSend = {
          ...values,
          login:
            values.username === userInfo.username ? undefined : values.username,
          email: values.email === userInfo.email ? undefined : values.email,
          username:
            values.username === userInfo.username ? undefined : values.username,
        };
        await UserService.editUser(userInfo.id, dataToSend);
        notification.success({ message: "Changes saved" });
        setToggleEdit(false);
      }
    } catch (error) {
      notification.error({ message: "Changes not saved" });
      console.log(error);
    }
  };

  return (
    <>
      <Title style={{ marginLeft: "15vh" }}>User Profile</Title>
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
        <Flex gap={"1rem"} style={{ marginLeft: "35vh" }}>
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
      </Form>
    </>
  );
};
export default UserPage;
