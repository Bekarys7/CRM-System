import React, { useCallback, useEffect, useState } from "react";
import Tab from "../components/Tab.tsx";
import AddTaskInput from "../components/AddTaskInput.tsx";
import styles from "./TodoPage.module.scss";
import TodoList from "../components/TodoList.tsx";
import LoadingSpinner from "../components/LoadingSpinner.tsx";
import { fetchTodos } from "../api/http.ts";
import type { TodoResponse, Info, Todo } from "../types/Todo.types.ts";
import type { TabType } from "../types/Tab.types.ts";

const TodoPage: React.FC = () => {
  const [todoData, setTodoData] = useState<TodoResponse<Todo, Info> | null>(
    null
  );
  const [tabName, setTabName] = useState<TabType>("all");
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  const fetchAndSetTodos = useCallback(async (): Promise<void> => {
    let spinnerTimeout: ReturnType<typeof setTimeout> | undefined;

    try {
      spinnerTimeout = setTimeout(() => {
        setShowSpinner(true);
      }, 300);

      const newData = await fetchTodos(tabName);
      setTodoData((currentData) => {
        if (JSON.stringify(currentData) === JSON.stringify(newData)) {
          return currentData;
        }
        return newData;
      });
    } catch (error) {
      alert(error);
    } finally {
      clearTimeout(spinnerTimeout);
      setShowSpinner(false);
    }
  }, [tabName]);

  useEffect(() => {
    fetchAndSetTodos();
  }, [fetchAndSetTodos]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchAndSetTodos();
    }, 5000);
    return () => clearInterval(interval);
  }, [fetchAndSetTodos]);

  const handleSetTabName = useCallback((tabName: TabType) => {
    setTabName(tabName);
  }, []);

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
