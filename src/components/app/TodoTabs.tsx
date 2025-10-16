import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import type { TabType } from "../../types/Tab.types";

interface TodoTabsProps {
  setTabName: (key: TabType) => void;
}

const TodoTabs: React.FC<TodoTabsProps> = ({ setTabName }) => {
  const items: TabsProps["items"] = [
    {
      key: "all",
      label: "All",
    },
    {
      key: "inWork",
      label: "In Work",
    },
    {
      key: "completed",
      label: "Completed",
    },
  ];

  const handleTabChange = (key: string) => {
    setTabName(key as TabType);
  };

  console.log("TodoTabs");

  return (
    <Tabs
      defaultActiveKey="1"
      items={items}
      onTabClick={handleTabChange}
      style={{ margin: "0 auto" }}
    />
  );
};
export default TodoTabs;
