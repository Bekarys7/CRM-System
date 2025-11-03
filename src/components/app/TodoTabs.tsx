import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import type { TabType } from "../../types/Tab.types";
import type { TodoInfo } from "../../types/Todo.types";

interface TodoTabsProps {
  setTabName: (key: TabType) => void;
  todoInfo: TodoInfo | undefined;
}

const isFilterStatus = (key: string): key is TabType => {
  return key === "all" || key === "inWork" || key === "completed";
};

const TodoTabs: React.FC<TodoTabsProps> = ({ setTabName, todoInfo }) => {
  const items: TabsProps["items"] = [
    {
      key: "all",
      label: `All(${todoInfo?.all || 0})`,
    },
    {
      key: "inWork",
      label: `In Work(${todoInfo?.inWork || 0})`,
    },
    {
      key: "completed",
      label: `Completed(${todoInfo?.completed || 0})`,
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
