import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import type { TabType } from "../../types/Tab.types";

interface TodoTabsProps {
  setTabName: (key: TabType) => void;
}

const isFilterStatus = (key: string): key is TabType => {
  return key === "all" || key === "inWork" || key === "completedd";
};

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
    if (isFilterStatus(key)) {
      setTabName(key);
    }
  };

  return (
    <Tabs
      defaultActiveKey="all"
      items={items}
      onTabClick={handleTabChange}
      style={{ margin: "0 auto" }}
    />
  );
};
export default TodoTabs;
