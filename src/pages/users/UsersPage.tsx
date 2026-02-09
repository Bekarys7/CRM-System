import React, { useEffect, useState } from "react";
import UsersTable from "../../components/admin/Table";
import { Flex, Typography } from "antd";
import type {
  MetaResponse,
  User,
  UserFilters as IUserFilters,
} from "../../types/Users.types";
import UserService from "../../services/user.service";
import UserFilters from "../../components/admin/UserFilters";

const UsersPage: React.FC = () => {
  const { Title } = Typography;
  const [usersData, setUsersData] = useState<MetaResponse<User>>({
    data: [],
    meta: { totalAmount: 0, sortBy: "", sortOrder: "asc" },
  });
  const [filters, setFilters] = useState<IUserFilters>({});
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

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
          page: filters.page,
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
        // Error handling can be implemented here, e.g., show a notification
      }
    };

    fetchAndSetUsers();
  }, [filters, refreshTrigger]);

  return (
    <>
      <Flex vertical gap="small">
        <Title>Users</Title>
        <UserFilters setFilters={setFilters} />
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
