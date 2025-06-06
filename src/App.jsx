import { useEffect, useState } from "react";
import Tabs from "./components/Tabs";
import TaskInput from "./components/TaskInput";
import styles from "./components/App.module.scss";
import Task from "./components/Task";

function App() {
  const [userToDos, setUserToDos] = useState([]);
  const [error, setError] = useState();

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
        setError(error);
      }
    }

    fetchUserTodos();
  }, []);
  console.log(userToDos);
  console.log(userToDos);
  return (
    <>
      <TaskInput />

      <div className={styles.wrapper}>
        <Tabs userToDos={userToDos}>Все</Tabs>
        <Tabs>В работе</Tabs>
        <Tabs>Сделано</Tabs>
      </div>
      <Task userToDos={userToDos} />
    </>
  );
}

export default App;
