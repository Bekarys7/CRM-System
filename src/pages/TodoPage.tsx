import React, { useEffect, useState } from "react";
import Tab from "../components/Tab.tsx";
import AddTaskInput from "../components/AddTaskInput.tsx";
import styles from "./TodoPage.module.scss";
import TodoList from "../components/TodoList.tsx";
import LoadingSpinner from "../components/LoadingSpinner.tsx";
import { fetchTodos } from "../api/http.ts";
import type { TodoResponse, Info, Todo } from "../types/Todo.ts";
import type { TabType } from "../types/tab.ts";

const TodoPage: React.FC = () => {
  const [todoData, setTodoData] = useState<TodoResponse<Todo, Info> | null>(
    null
  );
  const [tabName, setTabName] = useState<TabType>("all");
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  useEffect(() => {
    fetchAndSetTodos();
  }, [tabName]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchAndSetTodos();
    }, 5000);
    return () => clearInterval(interval);
  }, [tabName]);

  async function fetchAndSetTodos(): Promise<void> {
    let spinnerTimeout: ReturnType<typeof setTimeout> | undefined;

    try {
      spinnerTimeout = setTimeout(() => {
        setShowSpinner(true);
      }, 300);

      const todoData = await fetchTodos(tabName);
      setTodoData(todoData);
    } catch (error) {
      alert(error);
    } finally {
      clearTimeout(spinnerTimeout);
      setShowSpinner(false);
    }
  }

  function handleSetTabName(tabName: TabType) {
    setTabName(tabName);
  }

  return (
    <>
      <div className={styles.allWrapper}>
        <AddTaskInput updateTodos={fetchAndSetTodos} />

        <div className={styles.wrapper}>
          <Tab
            onChange={() => handleSetTabName("all")}
            isSelected={tabName === "all"}
          >
            All({todoData?.info?.all ?? "..."})
          </Tab>
          <Tab
            onChange={() => handleSetTabName("inWork")}
            isSelected={tabName === "inWork"}
          >
            In work({todoData?.info?.inWork ?? "..."})
          </Tab>
          <Tab
            onChange={() => handleSetTabName("completed")}
            isSelected={tabName === "completed"}
          >
            Completed({todoData?.info?.completed ?? "..."})
          </Tab>
        </div>

        {
          <TodoList
            toDoArray={todoData?.data || []}
            updateTodos={fetchAndSetTodos}
          />
        }
      </div>

      {showSpinner && <LoadingSpinner />}
    </>
  );
};

export default TodoPage;
