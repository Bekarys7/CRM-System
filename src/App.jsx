import { useState } from "react";
import Tabs from "./components/Tabs";
import TaskInput from "./components/TaskInput";
import styles from "./components/App.module.scss";
import Task from "./components/Task";

function App() {
  const [userTasks, setUserTasks] = useState([]);

  console.log(userTasks);

  return (
    <>
      <TaskInput />

      <div className={styles.wrapper}>
        <Tabs>Все</Tabs>
        <Tabs>В работе</Tabs>
        <Tabs>Сделано</Tabs>
      </div>
    </>
  );
}

export default App;
