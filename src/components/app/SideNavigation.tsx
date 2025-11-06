import React from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import styles from "./SideNavigation.module.scss";
import { UnorderedListOutlined, UserOutlined } from "@ant-design/icons";
import { logout } from "../../store/authActions";
import { useAppDispatch } from "../../store/hooks/hooks";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "grp",
    type: "group",
    children: [
      {
        key: "/",
        icon: <UnorderedListOutlined />,
        label: <Link to="/">Tasks</Link>,
      },
      {
        key: "/profile",
        icon: <UserOutlined />,
        label: <Link to="/profile">Profile</Link>,
      },
      {
        key: "/logout",
        icon: <UserOutlined />,
        label: <Link to="/auth">Logout</Link>,
      },
    ],
  },
];

const Sidemenu: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "/logout") {
      dispatch(logout());
    }
  };
  return (
    <Menu
      defaultSelectedKeys={["/"]}
      style={{ backgroundColor: "#F5F5F5", border: "none" }}
      mode="inline"
      items={items}
      className={styles.menu}
      onClick={handleMenuClick}
    />
  );
};

export default Sidemenu;
