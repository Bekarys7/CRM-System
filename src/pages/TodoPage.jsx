import { useEffect, useState } from "react";
import FilterTab from "../components/FilterTab.jsx";
import AddTaskInput from "../components/AddTaskInput.jsx";
import styles from "./TodoPage.module.scss";
import TodoList from "../components/TodoList.jsx";
import { fetchTodos } from "../api/http.js";

export default function TodoPage() {
  const [toDoData, setToDoData] = useState({});
  const [userTodosText, setUserTodosText] = useState("");
  const [tab, setTab] = useState("inWork");

  useEffect(() => {
    handlefetchTodos();
  }, [tab]);

  async function handlefetchTodos() {
    try {
      const toDoArray = await fetchTodos(tab);
      setToDoData(toDoArray);
    } catch (error) {
      console.log(error);
    }
  }

  function handleTab(tabName) {
    setTab((prev) => (prev = tabName));
  }
  return (
    <div className={styles.allWrapper}>
      <AddTaskInput
        userTodosText={userTodosText}
        onChange={(event) => setUserTodosText(event.target.value)}
        setUserTodosText={setUserTodosText}
        handlefetchUserTodos={handlefetchTodos}
      />

      <div className={styles.wrapper}>
        <FilterTab
          tab={tab}
          onChange={() => handleTab("all")}
          isSelected={tab === "all"}
        >
          All({toDoData.info?.all ?? "..."})
        </FilterTab>
        <FilterTab
          tab={tab}
          onChange={() => handleTab("inWork")}
          isSelected={tab === "inWork"}
        >
          In work({toDoData.info?.inWork ?? "..."})
        </FilterTab>
        <FilterTab
          tab={tab}
          onChange={() => handleTab("completed")}
          isSelected={tab === "completed"}
        >
          Completed({toDoData.info?.completed ?? "..."})
        </FilterTab>
      </div>
      <TodoList
        toDoArray={toDoData.data || []}
        tab={tab}
        handlefetchUserTodos={handlefetchTodos}
      />
    </div>
  );
}
