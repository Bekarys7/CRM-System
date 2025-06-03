import { useState } from "react";
import Tabs from "./components/Tabs";
import TaskInput from "./components/TaskInput";
import styles from "./components/App.module.scss";
import Task from "./components/Task";

function App() {
  const [count, setCount] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  function addTodo() {
    setTasks((prevTasks) => {
      const updated = [
        ...prevTasks,
        { id: count, task: newTask, completed: false, inWork: false },
      ];
      console.log(updated);
      return updated;
    });
    setCount((prevCount) => prevCount + 1);
    setNewTask("");
  }

  // tabcontent = <Task userTasks={tasks} />;
  // if (tabContent === "In work") {
  //   <Task></Task>;
  // }

  return (
    <>
      <TaskInput
        addTodo={addTodo}
        onChange={(event) => setNewTask(event.target.value)}
        newTask={newTask}
      />

      <div className={styles.wrapper}>
        <Tabs>All</Tabs>
        <Tabs>In work</Tabs>
        <Tabs>Completed</Tabs>
      </div>
      <form>
        <Task userTasks={tasks} />
      </form>
    </>
  );
}

export default App;
