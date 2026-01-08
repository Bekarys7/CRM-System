import React, { useEffect, useState } from "react";
import { Button, Flex, Input, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import type { User, UserFilters } from "../../types/Users.types";
import UserService from "../../services/user.service";
import type { MetaResponse } from "../../types/Users.types";
import {
  DownOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  UpOutlined,
} from "@ant-design/icons";

const UsersTable: React.FC = () => {
  const [userData, setUserData] = useState<MetaResponse<User>>();
  const [sortOrder, setSortOrder] = useState<UserFilters["sortOrder"]>("asc");
  const [sortBy, setSortBy] = useState<UserFilters["sortBy"]>("id");

  const handleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleSortBy = () => {
    setSortBy((prev) => (prev === "username" ? "id" : "username"));
  };

  const columns: TableProps<User>["columns"] = [
    {
      title: (
        <>
          Username
          <Button
            shape="circle"
            size="small"
            style={{ border: "none", backgroundColor: "#FAFAFA" }}
          >
            {sortOrder === "asc" ? (
              <SortAscendingOutlined
                onClick={handleSortOrder}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <SortDescendingOutlined
                onClick={handleSortOrder}
                style={{ cursor: "pointer" }}
              />
            )}
          </Button>
        </>
      ),
      dataIndex: "username",
      key: "username",
      render: (text) => <a>{text}</a>,
    },
    {
      title: (
        <>
          Email
          <Button
            shape="circle"
            size="small"
            style={{ border: "none", backgroundColor: "#FAFAFA" }}
          >
            {sortBy === "id" ? (
              <UpOutlined
                onClick={handleSortBy}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <DownOutlined
                onClick={handleSortBy}
                style={{ cursor: "pointer" }}
              />
            )}
          </Button>
        </>
      ),
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
            // @ts-expect-error //color for HUILA role
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

  useEffect(() => {
    const loadData = async () => {
      setUserData(
        await UserService.getUsersData({ sortOrder: sortOrder, sortBy: sortBy })
      );
    };
    loadData();
  }, [sortOrder, sortBy]);

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

  return (
    <>
      <Input.Search placeholder="Filled" />
      <Button style={{ width: "5%", marginTop: "0.5rem" }}>Filter</Button>
      <Table<User>
        tableLayout="fixed"
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 20 }}
      />
    </>
  );
};

export default UsersTable;
