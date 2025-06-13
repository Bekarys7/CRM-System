import { useEffect, useState } from "react";
import FilterTab from "../components/FilterTab.jsx";
import AddTaskInput from "../components/AddTaskInput.jsx";
import styles from "./TodoPage.module.scss";
import TodoList from "../components/TodoList.jsx";
import { fetchTodos } from "../api/http.js";

export default function TodoPage() {
  const [allToDosInfo, setAllToDosInfo] = useState([]);
  const [userToDos, setUserToDos] = useState([]);
  const [userTodosText, setUserTodosText] = useState("");
  const [tab, setTab] = useState("All");
  const [isLoading, setIsLoading] = useState(false);

  function handleTab(tabName) {
    setTab((prev) => (prev = tabName));
  }

  useEffect(() => {
    handlefetchTodos();
  }, [tab]);

  async function handlefetchTodos() {
    try {
      const ToDoArray = await fetchTodos();
      setAllToDosInfo(ToDoArray);
      setIsLoading(true);
      if (tab === "All") {
        setUserToDos(ToDoArray.data);
      } else if (tab === "In work") {
        setUserToDos(ToDoArray.data.filter((item) => item.isDone === false));
      } else if (tab === "Completed") {
        setUserToDos(ToDoArray.data.filter((item) => item.isDone === true));
      }
    } catch (error) {
      console.log(error);
    }
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
          onChange={() => handleTab("All")}
          isSelected={tab === "All"}
        >
          All({isLoading ? allToDosInfo.info.all : "..."})
        </FilterTab>
        <FilterTab
          tab={tab}
          onChange={() => handleTab("In work")}
          isSelected={tab === "In work"}
        >
          In work({isLoading ? allToDosInfo.info.inWork : "..."})
        </FilterTab>
        <FilterTab
          tab={tab}
          onChange={() => handleTab("Completed")}
          isSelected={tab === "Completed"}
        >
          Completed({isLoading ? allToDosInfo.info.completed : "..."})
        </FilterTab>
      </div>
      <TodoList
        userToDos={userToDos}
        tab={tab}
        setUserToDos={setUserToDos}
        handlefetchUserTodos={handlefetchTodos}
      />
    </div>
  );
}
