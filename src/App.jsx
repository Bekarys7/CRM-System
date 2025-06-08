import { useEffect, useState } from "react";
import Tabs from "./components/Tabs";
import TaskInput from "./components/TaskInput";
import styles from "./components/App.module.scss";
import Task from "./components/Task";
import { SendUserTodos, deleteUserTodos, editUserTodos } from "./http.js";

function App() {
  const [userToDos, setUserToDos] = useState([]);
  const [userTodosText, setUserTodosText] = useState("");
  const [errorPage, setError] = useState();

  console.log(userToDos);

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
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCheckbox(id) {
    const currentTask = userToDos.find((item) => item.id === id);

    setUserToDos((prevTodos) =>
      prevTodos.map((item) => {
        return item.id === id ? { ...item, isDone: !item.isDone } : item;
      })
    );
    try {
      await editUserTodos(id, { isDone: !currentTask.isDone });
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
        <Tabs>
          All{" "}
          <Task
            userToDos={userToDos}
            deleteTask={handleDelete}
            editTask={handleEdit}
            toggleCheckBox={handleCheckbox}
          />
        </Tabs>
        <Tabs>In work</Tabs>
        <Tabs>Completed</Tabs>
      </div>
    </>
  );
}

export default App;
