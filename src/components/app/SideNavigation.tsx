import React, { useEffect } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  TeamOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { useAppSelector } from "../../store/hooks/hooks";

type MenuItem = Required<MenuProps>["items"][number];

const SideNavigation: React.FC = () => {
  const userData = useAppSelector((state) => state.user.data);
  const location = useLocation();
  const hasAdminOrModeratorRole =
    userData?.roles?.some((role) => ["ADMIN", "MODERATOR"].includes(role)) ??
    false;

  useEffect(() => {
    console.log("User data updated:", userData);
  }, [userData]);

  console.log("SideNavigation Render:", {
    userData,
    roles: userData?.roles,
    isAdmin: userData?.roles?.some((role) =>
      ["ADMIN", "MODERATOR"].includes(role),
    ),
  });

  const items: MenuItem[] = [
    {
      key: "grp",
      type: "group",
      children: [
        {
          key: "/tasks",
          icon: <UnorderedListOutlined />,
          label: <Link to="/">Tasks</Link>,
        },
        {
          key: "/profile",
          icon: <UserOutlined />,
          label: <Link to="/profile">Profile</Link>,
        },
        ...(hasAdminOrModeratorRole
          ? [
              {
                key: "/users",
                icon: <TeamOutlined />,
                label: <Link to="/users">Users</Link>,
              },
            ]
          : []),
      ],
    },
  ];

  return (
    <Menu
      selectedKeys={[location.pathname]}
      style={{ backgroundColor: "#F5F5F5", border: "none" }}
      mode="inline"
      items={items}
    />
  );
};

export default SideNavigation;
