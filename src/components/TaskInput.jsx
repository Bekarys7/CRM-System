import styles from "../components/TaskInput.module.scss";
import { useState } from "react";

const arrayTasks = [];
export default function TaskInput({}) {
  const [userInput, setUserInput] = useState("");
  function handleUserInput(id, input) {
    setUserInput(() => {
      return input;
    });
  }

  console.log(userInput);
  console.log(arrayTasks);

  return (
    <>
      <div className={styles.wrapper}>
        <input
          type="text"
          required
          placeholder="Task to be done"
          minLength={2}
          onChange={(event) => handleUserInput(event.target.value)}
        />
        <button onClick={() => handleUserInput((arrayTasks[0] = userInput))}>
          Add
        </button>
      </div>
    </>
  );
}
