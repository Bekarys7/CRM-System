import styles from "../components/TaskInput.module.scss";
// import { useState } from "react";

export default function TaskInput({}) {
  // console.log(userTasks);

  return (
    <div className={styles.wrapper}>
      <input type="text" required placeholder="Task to be done" minLength={2} />
      <button>Add</button>
    </div>
  );
}
