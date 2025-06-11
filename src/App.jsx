import { useEffect, useState } from "react";
import Tabs from "./components/Tabs";
import AddTaskInput from "./components/AddTaskInput.jsx";
import styles from "./App.module.scss";
import TodoList from "./components/TodoList.jsx";
import { deleteUserTodos, editUserTodos, fetchUserTodos } from "./api/http.js";

function App() {
  const [allToDosInfo, setAllToDosInfo] = useState([]);
  const [userToDos, setUserToDos] = useState([]);
  const [userTodosText, setUserTodosText] = useState("");
  const [tab, setTab] = useState("All");
  const [isLoading, setIsLoading] = useState(false);

  function handleTab(tabName) {
    setTab((prev) => (prev = tabName));
  }

  useEffect(() => {
    handlefetchUserTodos();
  }, [tab]);

  async function handlefetchUserTodos() {
    try {
      const ToDoArray = await fetchUserTodos();
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

  async function handleEdit(id, newTask) {
    setUserToDos((prevTodos) => {
      return prevTodos.map((item) => {
        if (item.id === id) {
          return { ...item, title: newTask };
        }
        return item;
      });
    });
    try {
      await editUserTodos(id, { title: newTask });
      await handlefetchUserTodos();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCheckbox(id) {
    const currentTask = userToDos.find((item) => item.id === id);
    console.log(allToDosInfo);
    setUserToDos((prevTodos) =>
      prevTodos.map((item) => {
        return item.id === id ? { ...item, isDone: !item.isDone } : item;
      })
    );
    try {
      await editUserTodos(id, { isDone: !currentTask.isDone });
      await handlefetchUserTodos();
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
        handlefetchUserTodos={handlefetchUserTodos}
      />

      <div className={styles.wrapper}>
        <Tabs
          tab={tab}
          onChange={() => handleTab("All")}
          isSelected={tab === "All"}
        >
          All({isLoading ? allToDosInfo.info.all : "..."})
        </Tabs>
        <Tabs
          tab={tab}
          onChange={() => handleTab("In work")}
          isSelected={tab === "In work"}
        >
          In work({isLoading ? allToDosInfo.info.inWork : "..."})
        </Tabs>
        <Tabs
          tab={tab}
          onChange={() => handleTab("Completed")}
          isSelected={tab === "Completed"}
        >
          Completed({isLoading ? allToDosInfo.info.completed : "..."})
        </Tabs>
      </div>
      <TodoList
        userToDos={userToDos}
        editTask={handleEdit}
        toggleCheckBox={handleCheckbox}
        tab={tab}
        setUserToDos={setUserToDos}
        handlefetchUserTodos={handlefetchUserTodos}
      />
    </div>
  );
}

export default App;
