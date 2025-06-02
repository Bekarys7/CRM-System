import { useState } from "react";
import Tabs from "./components/Tabs";
import TaskInput from "./components/TaskInput";
import styles from "./components/App.module.scss";
import Task from "./components/Task";

function App() {
  const [selectedTab, setSelectedTab] = useState();
  const [userInput, setUserInput] = useState("");
  const [userTasks, setUserTasks] = useState([]);
  let [count, setCount] = useState(0);

  function handleuserTasks() {
    setUserTasks(() => {
      return [...userTasks, { id: count, name: userInput }];
    });
    setUserInput("");
    setCount((prevCount) => prevCount + 1);
  }

  function handleSelect(selectedButton) {
    setSelectedTab(() => selectedButton);
  }

  console.log(userTasks);

  return (
    <>
      <TaskInput
        onChange={handleuserTasks}
        onChange2={(event) => setUserInput(event.target.value)}
        userInput={userInput}
      />

      <div className={styles.wrapper}>
        <Tabs
          isActive={selectedTab === "all"}
          onSelect={() => handleSelect("all")}
          userTasks={userTasks}
        >
          Все
        </Tabs>
        <Tabs
          isActive={selectedTab === "inWork"}
          onSelect={() => handleSelect("inWork")}
          userTasks={userTasks}
        >
          В работе
        </Tabs>
        <Tabs
          isActive={selectedTab === "completed"}
          onSelect={() => handleSelect("completed")}
          userTasks={userTasks}
        >
          Сделано
        </Tabs>
      </div>
    </>
  );
}

export default App;
