import styles from "../components/TaskInput.module.scss";
// import { useState } from "react";

export default function TaskInput({}) {
  // const [userInput, setUserInput] = useState("Task to be done");
  // function handleUserInput(newText) {
  //   setUserInput(() => newText);
  // }

  return (
    <>
      <div className={styles.wrapper}>
        <input
          type="text"
          // value={userInput}
          required
          placeholder="Task to be done"
          // onChange={(event) => handleUserInput(event.target.value)}
        />
        <button>Add</button>
      </div>
    </>
  );
}
