import { useState } from "react";
import Tabs from "./components/Tabs";
import TaskInput from "./components/TaskInput";
import styles from "./components/App.module.scss";
import Task from "./components/Task";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  function addTodo() {
    setTasks((prevTasks) => {
      const updated = [
        ...prevTasks,
        { id: 0, task: newTask, completed: false, inWork: false },
      ];
      console.log(updated);
      return updated;
    });
    setNewTask("");
  }

  return (
    <>
      <TaskInput
        addTodo={addTodo}
        onChange={(event) => setNewTask(event.target.value)}
        newTask={newTask}
      />

      <div className={styles.wrapper}>
        <Tabs>Все</Tabs>
        <Tabs>В работе</Tabs>
        <Tabs>Сделано</Tabs>
      </div>
    </>
  );
}

export default App;
