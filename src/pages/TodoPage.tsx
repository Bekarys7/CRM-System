import { useEffect, useState } from "react";
import Tab from "../components/Tab.jsx";
import AddTaskInput from "../components/AddTaskInput.jsx";
import styles from "./TodoPage.module.scss";
import TodoList from "../components/TodoList.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { fetchTodos } from "../api/http.js";

export default function TodoPage() {
  const [todoData, setTodoData] = useState({});
  const [tabName, setTabName] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    fetchAndSetTodos();
  }, [tabName]);

  async function fetchAndSetTodos() {
    let spinnerTimeout;

    try {
      setIsLoading(true);

      spinnerTimeout = setTimeout(() => {
        setShowSpinner(true);
      }, 300);

      const todoData = await fetchTodos(tabName);
      setTodoData(todoData);
    } catch (error) {
      alert(error);
    } finally {
      clearTimeout(spinnerTimeout);
      setIsLoading(false);
      setShowSpinner(false);
    }
  }

  function handleSetTabName(tabName) {
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
            All({todoData.info?.all ?? "..."})
          </Tab>
          <Tab
            onChange={() => handleSetTabName("inWork")}
            isSelected={tabName === "inWork"}
          >
            In work({todoData.info?.inWork ?? "..."})
          </Tab>
          <Tab
            onChange={() => handleSetTabName("completed")}
            isSelected={tabName === "completed"}
          >
            Completed({todoData.info?.completed ?? "..."})
          </Tab>
        </div>

        {!isLoading && (
          <TodoList
            toDoArray={todoData.data || []}
            updateTodos={fetchAndSetTodos}
          />
        )}
      </div>

      {showSpinner && <LoadingSpinner />}
    </>
  );
}
