import { useEffect, useState } from "react";
import Tabs from "./components/Tabs";
import TaskInput from "./components/TaskInput";
import styles from "./components/App.module.scss";
import Task from "./components/Task";
import { SendUserTodos, deleteUserTodos } from "./http.js";

function App() {
  const [userToDos, setUserToDos] = useState([]);
  const [userTodosText, setUserTodosText] = useState("");
  const [errorPage, setError] = useState();

  useEffect(() => {
    async function fetchUserTodos() {
      try {
        const response = await fetch("https://easydev.club/api/v1/todos");
        const resData = await response.json();
        if (!response.ok) {
          throw new Error("Error occurred");
        }
        setUserToDos(resData.data);
      } catch (error) {
        setError(errorPage);
      }
    }
    fetchUserTodos();
  }, []);

  async function handleUserTodos() {
    const newTodo = { isDone: false, title: userTodosText };

    try {
      const savedTodo = await SendUserTodos(newTodo);

      setUserToDos((prevUserTodos) => {
        const updated = [...prevUserTodos, savedTodo];
        return updated;
      });
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
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <TaskInput
        addTodo={handleUserTodos}
        userTodosText={userTodosText}
        onChange={(event) => setUserTodosText(event.target.value)}
      />

      <div className={styles.wrapper}>
        <Tabs>All</Tabs>
        <Tabs>In work</Tabs>
        <Tabs>Completed</Tabs>
      </div>
      <Task userToDos={userToDos} deleteTask={handleDelete} />
    </>
  );
}

export default App;
