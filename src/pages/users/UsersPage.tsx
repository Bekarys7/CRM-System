import React, { useEffect, useState } from "react";
import UsersTable from "../../components/admin/Table";
import { Flex, Typography } from "antd";
import type { MetaResponse, User, UserFilters } from "../../types/Users.types";
import UserService from "../../services/user.service";
import Filter from "../../components/admin/Filter";

const UsersPage: React.FC = () => {
  const { Title } = Typography;
  const [usersData, setUsersData] = useState<MetaResponse<User>>({
    data: [],
    meta: { totalAmount: 0, sortBy: "", sortOrder: "asc" },
  });
  const [filters, setFilters] = useState<UserFilters>({});
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const onRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchAndSetUsers = async (): Promise<void> => {
      try {
        const response = await UserService.getUsersData({
          sortOrder: filters.sortOrder,
          sortBy: filters.sortBy,
          isBlocked: filters.isBlocked,
          search: filters.search,
          page: (filters.page || 1) - 1,
          limit: filters.limit,
        });
        setUsersData({
          data: response?.data ?? [],
          meta: response?.meta ?? {
            totalAmount: 0,
            sortBy: "",
            sortOrder: "asc",
          },
        });
      } catch (error) {
        alert(error);
      }
    };

    fetchAndSetUsers();
  }, [filters, refreshTrigger]);

  return (
    <>
      <Flex vertical gap="small">
        <Title>Users</Title>
        <Filter setFilters={setFilters} />
        <Flex vertical>
          <UsersTable
            usersData={usersData}
            setFilters={setFilters}
            filters={filters}
            onRefresh={onRefresh}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default UsersPage;
