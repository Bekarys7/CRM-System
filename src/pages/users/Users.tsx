import React from "react";
// import Filter from "../../components/admin/Filter";
import UsersTable from "../../components/admin/Table";
import { Flex, Typography } from "antd";

const UsersPage: React.FC = () => {
  const { Title } = Typography;
  return (
    <>
      <Flex vertical gap="small">
        <Title>Users</Title>
        <Flex vertical>
          <UsersTable />
        </Flex>
      </Flex>
    </>
  );
};

export default UsersPage;
