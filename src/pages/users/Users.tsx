import React, { useEffect } from "react";
import { Flex, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import type { User } from "../../types/Users.types";
import UserService from "../../services/user.service";
import type { MetaResponse } from "../../types/Users.types";

const columns: TableProps<User>["columns"] = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Registration Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Is blocked",
    dataIndex: "isBlocked",
    key: "isBlocked",
    render: (isBlocked) => (isBlocked ? "Yes" : "No"),
  },
  {
    title: "Roles",
    key: "roles",
    dataIndex: "roles",
    render: (_, { roles }) => (
      <Flex gap="small" align="center" wrap>
        {roles.map((role) => {
          let color = role.length > 5 ? "geekblue" : "green";
          if (role === "ADMIN") {
            color = "volcano";
          }
          if (role === "HUILA") {
            color = "black";
          }
          return (
            <Tag color={color} key={role}>
              {role.toUpperCase()}
            </Tag>
          );
        })}
      </Flex>
    ),
  },
  { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.username}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const UsersPage: React.FC = () => {
  const [userData, setUserData] = React.useState<MetaResponse<User>>();

  useEffect(() => {
    const loadData = async () => {
      setUserData(await UserService.getUsersData());
    };
    loadData();
  }, []);

  const data: User[] =
    userData?.data.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      date: user.date,
      isBlocked: user.isBlocked,
      roles: user.roles,
      phoneNumber: user.phoneNumber,
    })) ?? [];

  return <Table<User> columns={columns} dataSource={data} />;
};

export default UsersPage;
