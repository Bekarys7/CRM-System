import React, { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  TeamOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import UserService from "../../services/user.service";
import type { Profile } from "../../types/Auth.types";

type MenuItem = Required<MenuProps>["items"][number];

const SideNavigation: React.FC = () => {
  const [userData, setUserData] = useState<Profile>();
  const location = useLocation();
  const hasAdminOrModeratorRole =
    userData?.roles?.some((role) => ["ADMIN", "MODERATOR"].includes(role)) ??
    false;

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await UserService.getUserData();
      setUserData(data);
    };
    fetchUserData();
  }, []);

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
