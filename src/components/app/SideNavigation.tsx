import React from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import styles from "./SideNavigation.module.scss";
import { UnorderedListOutlined, UserOutlined } from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];

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
    ],
  },
];

const Sidemenu: React.FC = () => {
  const location = useLocation();

  return (
    <Menu
      selectedKeys={[location.pathname]}
      style={{ backgroundColor: "#F5F5F5", border: "none" }}
      mode="inline"
      items={items}
      className={styles.menu}
    />
  );
};

export default Sidemenu;
