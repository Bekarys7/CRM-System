// import { useEffect, useState } from "react";
// import type { MetaResponse, User } from "../../types/Users.types";
// import UserService from "../../services/user.service";

// import React from "react";
// import { Flex, Space, Table, Tag } from "antd";
// import type { TableProps } from "antd";

// const columns: TableProps<User>["columns"] = [
//   {
//     title: "Username",
//     dataIndex: "username",
//     key: "username",
//   },
//   {
//     title: "Email",
//     dataIndex: "email",
//     key: "email",
//   },
//   {
//     title: "Phone Number",
//     dataIndex: "phoneNumber",
//     key: "phoneNumber",
//   },
//   {
//     title: "Roles",
//     key: "roles",
//     dataIndex: "roles",
//     render: (_, { roles }) => (
//       <Flex gap="small" align="center" wrap>
//         {roles.map((tag) => {
//           let color = tag.length > 4 ? "geekblue" : "green";
//           if (tag === "HUILA") {
//             color = "volcano";
//           }
//           return (
//             <Tag color={color} key={tag}>
//               {tag.toUpperCase()}
//             </Tag>
//           );
//         })}
//       </Flex>
//     ),
//   },
//   {
//     title: "Is Blocked",
//     dataIndex: "isBlocked",
//     key: "isBlocked",
//   },
//   { title: "Registered Date", dataIndex: "date", key: "date" },
//   {
//     title: "Action",
//     key: "action",
//     render: () => (
//       <Space size="middle">
//         <a>Invite {}</a>
//         <a>Delete</a>
//       </Space>
//     ),
//   },
// ];

// const UsersPage: React.FC = () => {
//   const [userData, setUserData] = useState<MetaResponse<User>>();
//   console.log(userData);

//   const tableData: User[] =
//     userData?.data?.map((user: User) => ({
//       id: user.id,
//       username: user.username || "No Name",
//       email: user.email,
//       phoneNumber: user.phoneNumber || "No Phone Number",
//       roles: user.roles,
//       isBlocked: user.isBlocked ? "Yes" : "No",
//       date: user.date,
//     })) || [];

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const data = await UserService.getUsersData();
//       setUserData(data);
//       console.log(data.data);
//     };
//     fetchUserData();
//   }, []);
//   return <Table<User> columns={columns} dataSource={tableData} />;
// };

// export default UsersPage;
