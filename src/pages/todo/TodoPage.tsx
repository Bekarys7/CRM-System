import React, { useCallback, useEffect, useState } from "react";
import TodoTabs from "../../components/app/TodoTabs.tsx";
import TodoInput from "../../components/app/TodoInput.tsx";
import styles from "./TodoPage.module.scss";
import TodoList from "../../components/app/TodoList.tsx";
import LoadingSpinner from "../../components/app/LoadingSpinner.tsx";
import { fetchTodos } from "../../services/todo.service.ts";
import type { MetaResponse, TodoInfo, Todo } from "../../types/Todo.types.ts";
import type { TabType } from "../../types/Tab.types.ts";

const TodoPage: React.FC = () => {
  const [todoData, setTodoData] = useState<MetaResponse<Todo, TodoInfo>>();
  const [tabName, setTabName] = useState<TabType>("all");
  const [showSpinner, setShowSpinner] = useState<boolean>(true);

  console.log("TodoPage");

  const handleTabChange = (newTabName: TabType) => {
    if (newTabName !== tabName) {
      setTabName(newTabName);
      setShowSpinner(true);
    }
  };

  const fetchAndSetTodos = useCallback(async (): Promise<void> => {
    let spinnerTimeout: ReturnType<typeof setTimeout> | undefined;

    try {
      const newData = await fetchTodos(tabName);
      setTodoData((prevTodoData) => {
        if (JSON.stringify(prevTodoData) === JSON.stringify(newData)) {
          return prevTodoData;
        } else {
          return newData;
        }
      });
    } catch (error) {
      alert(error);
    } finally {
      clearTimeout(spinnerTimeout);
    }
  }, [tabName]);

  useEffect(() => {
    const loadData = async () => {
      await fetchAndSetTodos();
      setShowSpinner(false);
    };
    loadData();
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
          <TodoTabs setTabName={handleTabChange} todoInfo={todoData?.info} />
        </div>

        {showSpinner ? (
          <LoadingSpinner />
        ) : (
          <TodoList
            toDoArray={todoData?.data || []}
            updateTodos={fetchAndSetTodos}
          />
        )}
      </div>
    </>
  );
};

export default TodoPage;
