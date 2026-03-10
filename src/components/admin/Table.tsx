import React, { useMemo, useState } from "react";
import { Button, Flex, Popconfirm, Space, Table, Tag, message } from "antd";
import type { TableProps, PopconfirmProps } from "antd";
import { PermissionsModal } from "./PermissionModal";
import type { MetaResponse, User, UserFilters } from "../../types/Users.types";

import {
  DownOutlined,
  MoreOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import UserService from "../../services/user.service";

type UsersTable = {
  usersData: MetaResponse<User> | undefined;
  setFilters: React.Dispatch<React.SetStateAction<UserFilters>>;
  filters: UserFilters;
  onRefresh: () => void;
};

const UsersTable: React.FC<UsersTable> = ({
  usersData,
  setFilters,
  filters,
  onRefresh,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [popConfirmMessage, holder] = message.useMessage();

  const handleOpenPermissions = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(undefined);
  };

  const data: User[] =
    usersData?.data.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      date: user.date,
      isBlocked: user.isBlocked,
      roles: user.roles,
      phoneNumber: user.phoneNumber,
    })) ?? [];

  const cancelDelete: PopconfirmProps["onCancel"] = (e) => {
    popConfirmMessage.error("Click on No");
  };

  const handleSortOrder = () => {
    const newOrder = filters.sortOrder === "asc" ? "desc" : "asc";
    setFilters((prev) => ({ ...prev, sortOrder: newOrder }));
  };

  const handleSortBy = () => {
    const newSortBy = filters.sortBy === "id" ? "username" : "id";
    setFilters((prev) => ({ ...prev, sortBy: newSortBy }));
  };

  const handleBlockUser = async (userId: number) => {
    const reponse = await UserService.blockUser(userId);
    onRefresh();
    return reponse;
  };

  const handleUnblockUser = async (userId: number) => {
    const reponse = await UserService.unblockUser(userId);
    onRefresh();
    return reponse;
  };

  const handleDeleteUser = async (userId: number) => {
    const reponse = await UserService.deleteUser(userId);
    setFilters((prev) => ({ ...prev }));
    return reponse;
  };

  const handleTableChange: TableProps<User>["onChange"] = (pagination) => {
    setFilters((prev) => ({
      ...prev,
      page: pagination.current ?? 0,
      limit: pagination.pageSize ?? 20,
    }));
  };

  const columns: TableProps<User>["columns"] = [
    {
      title: (
        <>
          Username
          <Button
            shape="circle"
            size="small"
            onClick={handleSortOrder}
            style={{ backgroundColor: "#FAFAFA" }}
          >
            {filters.sortOrder === "asc" ? (
              <SortAscendingOutlined style={{ cursor: "pointer" }} />
            ) : (
              <SortDescendingOutlined style={{ cursor: "pointer" }} />
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
            onClick={handleSortBy}
            style={{ border: "none", backgroundColor: "#FAFAFA" }}
          >
            {filters.sortBy === "id" ? (
              <UpOutlined style={{ cursor: "pointer" }} />
            ) : (
              <DownOutlined style={{ cursor: "pointer" }} />
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
      title: "Edit profile",
      key: "edit",
      render: (_, record) => (
        <>
          <Link to={`/users/${record.id}`}>View profile</Link>
        </>
      ),
    },
    {
      title: "block/unblock",
      key: "block/unblock",
      render: (_, record) => (
        <Space size="middle">
          {!record.isBlocked ? (
            <Button
              type="primary"
              danger
              onClick={() => handleBlockUser(record.id)}
            >
              Block
            </Button>
          ) : (
            <Button type="primary" onClick={() => handleUnblockUser(record.id)}>
              Unblock
            </Button>
          )}
        </Space>
      ),
    },
    {
      title: " Delete",
      key: "delete",
      render: (_, record) => (
        <>
          {holder}
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => handleDeleteUser(record.id)}
            onCancel={cancelDelete}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
    {
      title: "Permissions",
      key: "permissions",
      render: (_, record) => (
        <>
          <Button
            shape="circle"
            icon={<MoreOutlined />}
            onClick={() => handleOpenPermissions(record)}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <Table<User>
        tableLayout="fixed"
        columns={columns}
        dataSource={data}
        rowKey="id"
        onChange={handleTableChange}
        pagination={{
          current: filters.page || 1,
          pageSize: filters.limit || 20,
          total: usersData?.meta.totalAmount,
          align: "start",
          showSizeChanger: false,
        }}
      />
      <PermissionsModal
        onCancel={handleCloseModal}
        open={isModalOpen}
        user={selectedUser}
        onRefresh={onRefresh}
      />
    </>
  );
};

export default UsersTable;
