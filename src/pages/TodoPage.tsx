import React, { useCallback, useEffect, useState } from "react";
import TodoTabs from "../components/app/TodoTabs.tsx";
import TodoInput from "../components/app/TodoInput.tsx";
import styles from "./TodoPage.module.scss";
import TodoList from "../components/app/TodoList.tsx";
import LoadingSpinner from "../components/app/LoadingSpinner.tsx";
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
    const interval = setInterval(() => {
      fetchAndSetTodos();
    }, 5000);
    return () => clearInterval(interval);
  }, [fetchAndSetTodos]);

  return (
    <>
      <div className={styles.allWrapper}>
        <TodoInput updateTodos={fetchAndSetTodos} />

        <div className={styles.wrapper}>
          <TodoTabs setTabName={setTabName} />
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
