import { useEffect, useState } from "react";
import Tab from "../components/Tab.jsx";
import AddTaskInput from "../components/AddTaskInput.jsx";
import styles from "./TodoPage.module.scss";
import TodoList from "../components/TodoList.jsx";
import { fetchTodos } from "../api/http.js";

export default function TodoPage() {
  const [toDoData, setToDoData] = useState({});
  const [todoText, setTodoText] = useState("");
  const [tabName, setTabName] = useState("inWork");

  useEffect(() => {
    getTodos();
  }, [tabName]);

  async function getTodos() {
    try {
      const toDoArray = await fetchTodos(tabName);
      setToDoData(toDoArray);
    } catch (error) {
      console.log(error);
    }
  }

  function handleTab(tabName) {
    setTabName((prev) => (prev = tabName));
  }
  return (
    <div className={styles.allWrapper}>
      <AddTaskInput
        todoText={todoText}
        setTodoText={setTodoText}
        onChange={(event) => setTodoText(event.target.value)}
        updateTodos={getTodos}
      />

      <div className={styles.wrapper}>
        <Tab onChange={() => handleTab("all")} isSelected={tabName === "all"}>
          All({toDoData.info?.all ?? "..."})
        </Tab>
        <Tab
          onChange={() => handleTab("inWork")}
          isSelected={tabName === "inWork"}
        >
          In work({toDoData.info?.inWork ?? "..."})
        </Tab>
        <Tab
          onChange={() => handleTab("completed")}
          isSelected={tabName === "completed"}
        >
          Completed({toDoData.info?.completed ?? "..."})
        </Tab>
      </div>
      <TodoList
        toDoArray={toDoData.data || []}
        updateTodos={getTodos}
        todoText={todoText}
        setTodoText={setTodoText}
      />
    </div>
  );
}
