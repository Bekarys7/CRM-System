import { useEffect, useState } from "react";
import Tabs from "./components/Tabs";
import TaskInput from "./components/TaskInput";
import styles from "./App.module.scss";
import Task from "./components/Task";
import { SendUserTodos, deleteUserTodos, editUserTodos } from "./http.js";

function App() {
  const [allToDosInfo, setAllToDosInfo] = useState([]);
  const [userToDos, setUserToDos] = useState([]);
  const [userTodosText, setUserTodosText] = useState("");
  const [errorPage, setError] = useState();
  const [tab, setTab] = useState("All");
  const [isLoading, setIsLoading] = useState(false);

  function handleTab(tabName) {
    setTab((prev) => (prev = tabName));
  }

  useEffect(() => {
    fetchUserTodos();
  }, [tab]);

  async function fetchUserTodos() {
    try {
      const response = await fetch("https://easydev.club/api/v1/todos");
      const resData = await response.json();
      if (!response.ok) {
        throw new Error("Error occurred");
      }
      setAllToDosInfo(resData);
      setIsLoading(true);
      if (tab === "All") {
        setUserToDos(resData.data);
      } else if (tab === "In work") {
        setUserToDos(resData.data.filter((item) => item.isDone === false));
      } else if (tab === "Completed") {
        setUserToDos(resData.data.filter((item) => item.isDone === true));
      }
    } catch (error) {
      setError(errorPage);
    }
  }

  async function handleAddUserTodos() {
    const newTodo = { isDone: false, title: userTodosText };

    try {
      await SendUserTodos(newTodo);
      fetchUserTodos();
    } catch (error) {
      console.log(error);
    }
    setUserTodosText("");
  }

  async function handleDelete(id) {
    setUserToDos((prevUserTodos) =>
      prevUserTodos.filter((item) => item.id !== id)
    );
    try {
      await deleteUserTodos(id);
      await fetchUserTodos();
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
      await fetchUserTodos();
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
      await fetchUserTodos();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.allWrapper}>
      <TaskInput
        addTodo={handleAddUserTodos}
        userTodosText={userTodosText}
        onChange={(event) => setUserTodosText(event.target.value)}
        setUserTodosText={setUserTodosText}
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
      <Task
        userToDos={userToDos}
        deleteTask={handleDelete}
        editTask={handleEdit}
        toggleCheckBox={handleCheckbox}
        tab={tab}
      />
    </div>
  );
}

export default App;
