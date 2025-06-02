import styles from "../components/TaskInput.module.scss";
// import { useState } from "react";

export default function TaskInput({ userInput, onChange, onChange2 }) {
  // console.log(userTasks);

  return (
    <div className={styles.wrapper}>
      <input
        value={userInput}
        type="text"
        required
        placeholder="Task to be done"
        minLength={2}
        onChange={onChange2}
      />
      <button onClick={onChange}>Add</button>
    </div>
  );
}
